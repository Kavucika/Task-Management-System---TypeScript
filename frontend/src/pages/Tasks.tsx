import { useEffect, useState } from 'react'
import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskApi'
import type { Task } from '../types/task'

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  async function handleAddTask(task: Task) {
    try {
      const newTask = await createTask(task.title)

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ])
    } catch (error) {
      console.error(error)
    }
  }

  async function handleToggleTask(id: number) {
    const task = tasks.find((task) => task.id === id)

    if (!task) {
      return
    }

    try {
      const updatedTask = await updateTask(id, {
        completed: !task.completed,
      })

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function handleEditTask(
    id: number,
    title: string
  ) {
    try {
      const updatedTask = await updateTask(id, {
        title,
      })

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Header />

        {loading ? (
          <p className="text-gray-500">
            Loading tasks...
          </p>
        ) : (
          <>
            <TaskForm onAdd={handleAddTask} />

            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </>
        )}
      </div>
    </main>
  )
}

export default Tasks