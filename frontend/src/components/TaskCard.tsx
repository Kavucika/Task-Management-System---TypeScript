import { useState } from 'react'
import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, title: string) => void
}

function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  function handleSave() {
    if (editTitle.trim() === '') {
      return
    }

    onEdit(task.id, editTitle.trim())
    setIsEditing(false)
  }

  function handleCancel() {
    setEditTitle(task.title)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="flex-1">
            <span
              className={
                task.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-900'
              }
            >
              {task.title}
            </span>

            <p className="text-sm text-gray-500">
              {task.completed ? 'Completed' : 'Pending'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </>
      )}
    </li>
  )
}

export default TaskCard