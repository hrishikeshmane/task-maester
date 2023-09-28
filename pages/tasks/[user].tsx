import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { PrimeReactProvider } from "primereact/api"

import AddTask from "@/components/AddTask"
import TaskList from "@/components/TaskList"
import { Layout } from "@/components/layout"

const Tasks = () => {
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
            <TaskList />
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Tasks
