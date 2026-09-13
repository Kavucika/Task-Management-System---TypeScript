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

  return (
    <div>
      <Header />

      <TaskForm onAdd={handleAddTask} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
      />
    </div>
  )
}

export default Tasks