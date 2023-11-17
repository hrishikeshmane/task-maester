import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { Layout } from "@/components/layout"
import { DataTable } from "@/components/tasks/DataTable"
import { columns } from "@/components/tasks/columns"
import * as taskList from "@/components/tasks/tasks.json"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function IndexPage() {
  const [tasks, setTasks] = useState(taskList.slice(0, 6))

  const [userName, setUserName] = useState("hrishi")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value)
  }

  const userNameSubmitHandler = (e) => {
    setLoading(true)

    e.preventDefault()
    router.push(`/tasks/${userName}`)

    setLoading(false)
  }

  return (
    <Layout>
      <Head>
        <title>Task Tracker</title>
        <meta
          name="description"
          content="Task Tracker helps you track your tasks and projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Keep your task on track with{" "}
            <span className="underline underline-offset-4">Task Maester</span>
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Don&apos;t let a busy schedule or a long to-do list overwhelm you.
            Try our task tracker app today and take control of your
            productivity!
          </p>
        </div>

        <div className="flex max-w-sm items-center space-x-2">
          <Input
            type="text"
            className="w-full"
            placeholder="Enter your name to view your tasks"
            value={userName}
            onChange={userNameChangeHandler}
          />
          <Button type="submit" onClick={userNameSubmitHandler}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      </section>
      <section className="container my-10 grid items-center gap-6  pb-8 pt-6 md:py-10">
        <DataTable data={tasks} columns={columns} />
      </section>
    </Layout>
  )
}
