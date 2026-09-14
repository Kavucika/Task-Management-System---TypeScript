import { Router } from 'express'
import {
  getAllTasks,
  addTask,
  editTask,
  removeTask,
} from '../controllers/taskController.js'

const router = Router()

router.get('/', getAllTasks)
router.post('/', addTask)
router.put('/:id', editTask)
router.delete('/:id', removeTask)

export default router