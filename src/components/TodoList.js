import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (titleInput.trim() !== "" && descriptionInput.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: titleInput.trim(),
        description: descriptionInput.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      saveTask([...tasks, newTask]);
      setTitleInput('');
      setDescriptionInput('');
      alert("Task added successfully!");
    } else {
      alert("Please enter both title and description!");
    }
  };

  const saveTask = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTask(updatedTasks);
    alert("Task deleted successfully!");
  };

  const toggleCompleted = (taskId, checkbox) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: checkbox.checked };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTask(updatedTasks);
  };

  const editTask = (taskId, currentTitle, currentDescription) => {
    const newTitle = prompt("Enter new title:", currentTitle);
    const newDescription = prompt("Enter new description:", currentDescription);

    if (newTitle !== null && newDescription !== null) {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, title: newTitle, description: newDescription };
        }
        return task;
      });
      setTasks(updatedTasks);
      saveTask(updatedTasks);
      alert("Task updated successfully!");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 border p-[2rem] mt-[80px] border-black">
      <h1 className="text-center text-3xl font-bold mb-4">To-Do List</h1>
      <form className="task-form mb-4 flex flex-col gap-[1.2rem]" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter title..." 
          value={titleInput} 
          onChange={(e) => setTitleInput(e.target.value)} 
          required 
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input 
          type="text" 
          placeholder="Enter description..." 
          value={descriptionInput} 
          onChange={(e) => setDescriptionInput(e.target.value)} 
          required 
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Task</button>
      </form>
      <ul id="taskList">
        {tasks.map(task => (
          <li key={task.id} className={"p-4 bg-gray-200 mb-4 rounded flex items-center border border-black shadow-md " + (task.completed ? "line-through text-gray-600" : "")}>
            <span>{task.title}: {task.description}</span>
            <button onClick={() => deleteTask(task.id)} className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            <button onClick={() => editTask(task.id, task.title, task.description)} className="mx-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
            <input 
              type="checkbox" 
              onChange={(e) => toggleCompleted(task.id, e.target)} 
              checked={task.completed} 
              className="mx-4"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;