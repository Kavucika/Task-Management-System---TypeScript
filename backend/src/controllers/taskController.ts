import type { Request, Response } from 'express'
import {
  getTasks,
  createTask,
} from '../services/taskService.js'

export function getAllTasks(_req: Request, res: Response) {
  const tasks = getTasks()

  res.json(tasks)
}

export function addTask(req: Request, res: Response) {
  const { title } = req.body

  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({
      message: 'Task title is required',
    })
    return
  }

  const task = createTask(title.trim())

  res.status(201).json(task)
}