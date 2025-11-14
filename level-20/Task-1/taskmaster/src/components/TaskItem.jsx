import React, { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

const TaskItem = ({ task }) => {
  const { deleteTask, updateTaskStatus } = useContext(TaskContext);

  const handleDelete = () => {
    deleteTask(task.id); // Delete task by ID
  };

  const handleStatusToggle = () => {
    updateTaskStatus(task.id); // Toggle task completion
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={handleStatusToggle}>
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <button onClick={handleDelete}>Delete Task</button>
    </li>
  );
};

export default TaskItem;
