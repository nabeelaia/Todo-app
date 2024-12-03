import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('should render the task list correctly', () => {
  render(<App />);

  // Add a task
  const taskInput = screen.getByPlaceholderText('Task...');
  const deadlineInput = screen.getByPlaceholderText('Deadline (in days)...');
  const addButton = screen.getByText('Add Task');
  
  fireEvent.change(taskInput, { target: { value: 'Test Task 1' } });
  fireEvent.change(deadlineInput, { target: { value: '5' } });
  fireEvent.click(addButton);
  
  // Add another task
  fireEvent.change(taskInput, { target: { value: 'Test Task 2' } });
  fireEvent.change(deadlineInput, { target: { value: '3' } });
  fireEvent.click(addButton);

  // Verify both tasks are rendered
  expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  expect(screen.getByText('Deadline: 5 day(s)')).toBeInTheDocument();
  expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  expect(screen.getByText('Deadline: 3 day(s)')).toBeInTheDocument();

  // Now remove the first task
  const removeButton1 = screen.getAllByText('Remove')[0];
  fireEvent.click(removeButton1);

  // Verify that the first task is removed
  expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Deadline: 5 day(s)')).not.toBeInTheDocument();

  // Verify that the second task is still present
  expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  expect(screen.getByText('Deadline: 3 day(s)')).toBeInTheDocument();
});
