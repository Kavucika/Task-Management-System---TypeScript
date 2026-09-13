import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
}

function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
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
    </li>
  )
}

export default TaskCard