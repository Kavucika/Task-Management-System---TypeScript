import { useState } from 'react'
import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import type { Task } from '../types/task'

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(task: Task) {
    setTasks([...tasks, task])
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function handleDeleteTask(id: number) {
    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }

  function handleEditTask(id: number, title: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title }
          : task
      )
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Header />

        <TaskForm onAdd={handleAddTask} />

        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </main>
  )
}

export default Tasks