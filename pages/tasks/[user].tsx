import { promises as fs } from "fs"
import path from "path"
import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { z } from "zod"

import AddTask from "@/components/AddTask"
import { Layout } from "@/components/layout"
import { DataTable } from "@/components/tasks/DataTable"
import { columns } from "@/components/tasks/columns"
import { Task, taskSchema } from "@/components/tasks/schema"
import * as taskList from "@/components/tasks/tasks.json"

// Simulate a database read for tasks.
function getTasks() {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
  // )
  const tasks = JSON.parse(taskList.toString())
  return z.array(taskSchema).parse(tasks)
}

const Tasks = () => {
  // const tasks = await getTasks()
  const [tasks, setTasks] = useState(taskList)
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
