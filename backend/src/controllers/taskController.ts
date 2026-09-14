import type { Request, Response } from 'express'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService.js'

export async function getAllTasks(
  _req: Request,
  res: Response
) {
  try {
    const tasks = await getTasks()

    res.json(tasks)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to fetch tasks',
    })
  }
}

export async function addTask(
  req: Request,
  res: Response
) {
  const { title } = req.body

  if (
    !title ||
    typeof title !== 'string' ||
    title.trim() === ''
  ) {
    res.status(400).json({
      message: 'Task title is required',
    })

    return
  }

  try {
    const task = await createTask(title.trim())

    res.status(201).json(task)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to create task',
    })
  }
}

export async function editTask(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: 'Invalid task ID',
    })

    return
  }

  const { title, completed } = req.body

  const updates: {
    title?: string
    completed?: boolean
  } = {}

  if (title !== undefined) {
    if (
      typeof title !== 'string' ||
      title.trim() === ''
    ) {
      res.status(400).json({
        message: 'Task title must be a non-empty string',
      })

      return
    }

    updates.title = title.trim()
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      res.status(400).json({
        message: 'Completed must be a boolean',
      })

      return
    }

    updates.completed = completed
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({
      message: 'No fields to update',
    })

    return
  }

  try {
    const task = await updateTask(id, updates)

    res.json(task)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to update task',
    })
  }
}

export async function removeTask(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: 'Invalid task ID',
    })

    return
  }

  try {
    await deleteTask(id)

    res.json({
      message: 'Task deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to delete task',
    })
  }
}