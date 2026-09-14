import type { Task } from '../types/task.js'

let tasks: Task[] = []

export function getTasks(): Task[] {
  return tasks
}

export function createTask(title: string): Task {
  const newTask: Task = {
    id: Date.now(),
    title,
    completed: false,
  }

  tasks.push(newTask)

  return newTask
}