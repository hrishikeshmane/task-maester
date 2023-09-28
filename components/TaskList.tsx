import React, { useEffect, useState } from "react"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"

import { Checkbox } from "./ui/checkbox"

const dummyTasks = [
  {
    id: "1",
    title: "Bamboo Watch",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    status: "In Progress",
    dueDate: "2020-05-24T00:00:00",
  },
  {
    id: "2",
    title: "Black Watch",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    status: "Completed",
    dueDate: "2020-06-24T00:00:00",
  },
  {
    id: "3",
    title: "Blue Band",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    status: "On Hold",
    dueDate: "2020-07-24T00:00:00",
  },
  {
    id: "4",
    title: "Blue T-Shirt",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    status: "Not Started",
    dueDate: "2020-08-24T00:00:00",
  },
]

interface ITask {
  id: string
  title: string
  description: string
  status: string
  dueDate: string
}

export default function RemovableSortDemo() {
  const [tasks, setTasks] = useState(dummyTasks)
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
  const [rowClick, setRowClick] = useState<boolean>(true)

  const formatDate = (value) => {
    const date = new Date(value)

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.dueDate)
  }

  const clipText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text
  }

  const TitleBodyTemplate = (rowData) => clipText(rowData.title, 20)

  const DesceBodyTemplate = (rowData) => clipText(rowData.description, 120)

  const editTask = (rowData) => {
    console.log("editTask", rowData)
  }

  const deleteTask = (rowData) => {
    console.log("deleteTask", rowData)
  }

  const editDelBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row">
        <button
          className="p-button p-component p-button-text p-button-icon-only rounded-md p-2 text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
          onClick={() => editTask(rowData)}
        >
          <span className="p-button-icon p-c pi pi-pencil p-button-icon-left"></span>
        </button>
        <button
          className="p-button p-component p-button-text p-button-icon-only rounded-md p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
          onClick={() => deleteTask(rowData)}
        >
          <span className="p-button-icon p-c pi pi-trash p-button-icon-left"></span>
        </button>
      </div>
    )
  }

  const statusBodyTemplate = (rowData) => {
    if (rowData.status === "In Progress") {
      return (
        <span className="rounded-md bg-orange-100 px-1 dark:bg-orange-900">
          {rowData.status}
        </span>
      )
    } else if (rowData.status === "Completed") {
      return (
        <span className="rounded-md bg-green-100 px-1 dark:bg-green-900">
          {rowData.status}
        </span>
      )
    } else if (rowData.status === "On Hold") {
      return (
        <span className="rounded-md bg-sky-100 px-1 dark:bg-sky-900">
          {rowData.status}
        </span>
      )
    } else if (rowData.status === "Not Started") {
      return (
        <span className="rounded-md bg-gray-100 px-1 dark:bg-gray-700">
          {rowData.status}
        </span>
      )
    }
  }

  return (
    <>
      <DataTable
        value={tasks}
        sortMode="multiple"
        removableSort
        selectionMode={rowClick ? undefined : "radiobutton"}
        selection={selectedTask!}
        onSelectionChange={(e) => setSelectedTask(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem", alignItems: "center" }}
      >
        <Column
          header=""
          selectionMode="single"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          sortable
          body={TitleBodyTemplate}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="description"
          header="Description"
          body={DesceBodyTemplate}
          sortable
          style={{ width: "45%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          dataType="date"
          body={dateBodyTemplate}
          field="dueDate"
          header="Due Date"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          //   dataType="date"
          body={editDelBodyTemplate}
          //   field="dueDate"
          header="Edit"
          //   sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </>
  )
}
