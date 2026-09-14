import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {  return (
    <>
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <span className={task.completed ? 'line-through' : ''}>
        {task.title}
      </span>{' '}
      - {task.completed ? 'Completed' : 'Pending'}

      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
    </>
  )
}

export default TaskCard