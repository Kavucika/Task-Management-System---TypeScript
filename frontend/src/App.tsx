import {useState} from 'react'

interface Task{
  id:number
  title:string
  completed:boolean
}

function Header(){
  return(
    <h1>Task Management System</h1>
  )
}

function TaskForm(){
  const [task, setTask]= useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  return(
    <>
      <form onSubmit={(event) => {
        event.preventDefault()

        if(task.trim() === ''){
          return
        }

        const newTask : Task ={
          id: Date.now(),
          title: task.trim(),
          completed: false
        }

        setTasks([...tasks, newTask])
        setTask('')
      }}>

        <input type='text' placeholder='Enter a task' value={task} onChange={(event) => setTask(event.target.value)} />
        <button type='submit'>Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type='checkbox'
              checked = {task.completed}
              onChange={() => {
                setTasks(tasks.map((item) => 
                  item.id === task.id
                    ? {...item , completed : !item.completed}
                    : item
                ))
              }}
            />
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>{' '}
            - {task.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </>
  )
}

function App(){
  return (
    <div>
      <Header/>
      <TaskForm/>
    </div>
  )
}

export default App