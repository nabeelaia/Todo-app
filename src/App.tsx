import React, { useState } from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  // Initial task state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  // State to hold the new task title
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Function to handle adding a new task
  const addTask = () => {
    if (!newTaskTitle.trim()) return; // Don't add if the title is empty
    const newTask: Task = {
      id: tasks.length + 1, // Simple ID generation (you could use UUID)
      title: newTaskTitle,
      isCompleted: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle(''); // Clear the input field after adding
  };

  return (
    <div>
      <h1>Tasks</h1>

      {/* Input for new task */}
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter new task"
      />

      {/* Button to add task */}
      <button onClick={addTask}>Add Task</button>


      {/* Task list */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.isCompleted ? '(Completed)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
