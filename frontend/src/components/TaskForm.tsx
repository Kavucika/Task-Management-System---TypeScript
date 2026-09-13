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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm