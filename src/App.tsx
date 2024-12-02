import React, { FC, ChangeEvent, useState } from 'react';
import "./index.css";


const App: FC =() => {
  const [task, setTask]=useState<string>("");
  const [deadline, setDeadline]=useState<number>(0);
  const [todo, setTodoList]=useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name==="todoi"){

      setTask(event.target.value);
    }else{
        setDeadline(Number(event.target.value));
      }
    };

    const addTask = (): void =>{
setTodoList([...setTodoList, task]);
    }

  return(
    <div className ="App">
      <div className="header">

    <div className="inputContainer">
      <input type ="text" placeholder="Task..." name="todoi" onChange={handleChange}/>
      <input type = "number" placeholder="Deadline (in days)..." name="days" onChange={handleChange}/>
      </div>
      <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList"></div>
      </div>


  )
}

// type Priority = 'p1' | 'p2' | 'p3';

// type TODOLIST = {
//   id: number;
//   title: string;
//   isCompleted: boolean;
//   priority?: Priority;
// };

// function App() {
//   // Initial task state
//   const [tasks, setTasks] = useState<Task[]>([
   
//   ]);

//   // State to hold the new task title
//   const [newTaskTitle, setNewTaskTitle] = useState('');

//   // Function to handle adding a new task
//   const addTask = () => {
//     if (!newTaskTitle.trim()) return; // Don't add if the title is empty
//     const newTask: Task = {
//       id: tasks.length + 1, // Simple ID generation (you could use UUID)
//       title: newTaskTitle,
//       isCompleted: false,
//     };
//     setTasks((prevTasks) => [...prevTasks, newTask]);
//     setNewTaskTitle(''); // Clear the input field after adding
//   };

//   return (
//     <div>
//       <h1>Tasks</h1>

//       {/* Input for new task */}
//       <input
//         type="text"
//         value={newTaskTitle}
//         onChange={(e) => setNewTaskTitle(e.target.value)}
//         placeholder="Enter a TODO item"
//       />

//       {/* Button to add task */}
//       <button onClick={addTask}>Add Task</button>


//       {/* Task list */}
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.title} {task.isCompleted ? '(Completed)' : ''}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
