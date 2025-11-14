import React, { useState, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { tasks, filterTasks, loading } = useTasks();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Filter tasks based on the selected filter
    filterTasks(filter);
  }, [filter, tasks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome {user ? user.email : "Guest"}!</h2>

      <div className="mb-3">
        <label htmlFor="filter" className="form-label">
          Filter Tasks by Status
        </label>
        <select
          id="filter"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <TaskForm />

      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
