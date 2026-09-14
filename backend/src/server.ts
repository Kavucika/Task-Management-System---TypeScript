import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes.js'

const app = express()

const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)

app.get('/', (_req, res) => {
  res.json({
    message: 'Task Management API is running',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})