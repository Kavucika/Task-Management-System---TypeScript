import { supabase } from '../db/supabase.js'
import type { Task } from '../types/task.js'

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    return []
  }

  return data
}

export async function createTask(title: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      title,
      completed: false,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('Failed to create task')
  }

  return data
}

export async function updateTask(
  id: number,
  updates: Partial<Pick<Task, 'title' | 'completed'>>
): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('Task not found')
  }

  return data
}

export async function deleteTask(id: number): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}