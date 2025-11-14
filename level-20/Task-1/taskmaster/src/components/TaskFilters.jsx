import React, { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskList from "./TaskList";

const TaskFilters = () => {
  const { tasks } = useContext(TaskContext);
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // for 'all'
  });

  return (
    <div className="task-filters">
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">
          Filter Tasks
        </label>
        <select
          id="filter"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default TaskFilters;
