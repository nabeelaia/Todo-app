import React, { FC, ChangeEvent, useState } from "react";
import "./index.css";
import { TaskN } from "/vite-env.d.ts"; // Correctly import the interface

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<TaskN[]>([]); // Use TaskN interface
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which item is being edited

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "todoi") {
      setTask(event.target.value);
    } else if (event.target.name === "days") {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    if (editIndex !== null) {
      // Edit existing task
      const updatedList = [...todoList];
      updatedList[editIndex] = { taskName: task, deadline: deadline };
      setTodoList(updatedList);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new task
      const newTask: TaskN = { taskName: task, deadline: deadline };
      setTodoList([...todoList, newTask]);
    }
    setTask(""); // Clear input fields
    setDeadline(0);
  };
  const handleEdit = (index: number): void => {
    const taskToEdit = todoList[index];
    setTask(taskToEdit.taskName);
    setDeadline(taskToEdit.deadline);
    setEditIndex(index); // Set edit mode to this task
  };
  const removeItem = (index: number): void => {
    const updatedList = todoList.filter((_, i) => i !== index); // Remove the selected task
    setTodoList(updatedList);
    if (editIndex === index) {
      setEditIndex(null); // Exit edit mode if the edited task is deleted
      setTask("");
      setDeadline(0);
    }
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
            value={deadline || ""}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>{editIndex !== null ? "Update Task" : "Add Task"}</button>

      </div>
      <div className="todoList">
        {todoList.map((todo, index) => (
          <div key={index} className="todo">
            <h3>{todo.taskName}</h3>
            <p>Deadline: {todo.deadline} day(s)</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;