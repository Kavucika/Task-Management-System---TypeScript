import type { Task } from '../types/task'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
}

function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

export default TaskList