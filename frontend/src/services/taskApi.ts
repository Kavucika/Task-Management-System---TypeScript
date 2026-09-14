import type { Task } from '../types/task'

const API_URL = 'http://localhost:5000/tasks'

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json()
}

export async function createTask(
  title: string
): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  return response.json()
}

export async function updateTask(
  id: number,
  updates: {
    title?: string
    completed?: boolean
  }
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error('Failed to update task')
  }

  return response.json()
}

export async function deleteTask(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}