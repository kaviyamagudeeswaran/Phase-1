import React, { createContext, useState, useContext, useEffect } from "react";

// Create TaskContext
export const TaskContext = createContext();

// TaskContext Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tasks from local storage or API (use local storage here for simplicity)
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setLoading(false);
  }, []);

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      _id: new Date().toISOString(),
      completed: false,
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Update an existing task
  const updateTask = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Filter tasks by completion status
  const filterTasks = (status) => {
    if (status === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (status === "incomplete") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks; // All tasks
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTasks = () => {
  return useContext(TaskContext);
};
