import { useState } from 'react'
import type { Task } from '../types/task'

interface TaskFormProps {
  onAdd: (task: Task) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [task, setTask] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (task.trim() === '') {
      return
    }

    const newTask: Task = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    }

    onAdd(newTask)
    setTask('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex gap-3"
    >
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm