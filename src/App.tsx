import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { taskN } from './vite-env.d.ts'; // Import the interface

const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<taskN[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load todo list from localStorage on initial load
  useEffect(() => {
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
      setTodoList(JSON.parse(savedTodoList));
    }
  }, []);

  // Save todo list to localStorage whenever it changes
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'todoi') {
      setTask(event.target.value);
    } else if (event.target.name === 'days') {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline, done: false };
    if (editIndex !== null) {
      const updatedTodoList = [...todoList];
      updatedTodoList[editIndex] = { ...newTask, done: todoList[editIndex].done }; // Keep the done state unchanged when editing
      setTodoList(updatedTodoList);
      setEditIndex(null); // Reset edit mode
    } else {
      setTodoList([...todoList, newTask]);
    }
    setTask('');
    setDeadline(0);
  };

  const handleEdit = (index: number): void => {
    setTask(todoList[index].taskName);
    setDeadline(todoList[index].deadline);
    setEditIndex(index);
  };

  const removeItem = (index: number): void => {
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
  };

  const toggleDone = (index: number): void => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].done = !updatedTodoList[index].done; // Toggle the done state
    setTodoList(updatedTodoList);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="todoi"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in days)..."
            name="days"
            value={deadline || ''}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="todoList">
        {todoList.map((todo, index) => (
          <div key={index} className={`todo ${todo.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(index)}
              className="checkbox"
            />
            <h3>{todo.taskName}</h3>
            <p>Deadline: {todo.deadline} day(s)</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
