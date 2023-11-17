import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import supabase from "@/supabaseClient"
import { useRealtime } from "react-supabase"

import AddTask from "@/components/AddTask"
import { Layout } from "@/components/layout"
import { DataTable } from "@/components/tasks/DataTable"
import { columns } from "@/components/tasks/columns"
import { Task, taskSchema } from "@/components/tasks/schema"
import * as taskList from "@/components/tasks/tasks.json"

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase.from("todos").select("*")
    setTasks(todos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    const taskListener = supabase
      .channel("public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          console.log("Change received!", payload)
          if (payload.eventType === "INSERT") {
            setTasks((tasks) => [...tasks, payload.new])
          }
          if (payload.eventType === "DELETE") {
            setTasks((tasks) =>
              tasks.filter((task) => task.id !== payload.old.id)
            )
          }
          if (payload.eventType === "UPDATE") {
            setTasks((tasks) =>
              tasks.map((task) =>
                task.id === payload.new.id ? payload.new : task
              )
            )
          }
        }
      )
      .subscribe()

    return () => taskListener.unsubscribe()
  }, [tasks])

  const router = useRouter()
  const { user } = router.query

  return (
    <>
      <Layout>
        <Head>
          <title> {user} | Tasks</title>
        </Head>
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
              👋 Hello, {user}
            </h1>
          </div>

          <AddTask />

          <div className="scroll-auto">
            <DataTable data={tasks} columns={columns} />
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Tasks
