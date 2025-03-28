import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import custom styles

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const colors = ["#FF5733", "#33B5E5", "#2ECC71", "#FFCC00", "#9B59B6"]; // Task colors

  // Function to get current date and day
  const getCurrentDateAndDay = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const day = now.toLocaleDateString("en-GB", { weekday: "long" });
    return { date, day };
  };

  // Add Task
  const addTask = () => {
    if (!title.trim() || !description.trim()) return;

    const { date, day } = getCurrentDateAndDay();
    const colorIndex = tasks.length % colors.length; // Cycle through colors

    const newTask = {
      id: Date.now(),
      title,
      description,
      date,
      day,
      color: colors[colorIndex],
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  // Mark as Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit Task
  const startEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // Update Task
  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editId ? { ...task, title, description } : task
      )
    );
    setEditId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="container mt-4 text-center">
      <h1 className="text-primary">Task Manager</h1>

      {/* Task Form */}
      <div className="card p-3 shadow-sm mx-auto form-container">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editId ? (
          <button className="btn btn-success w-100" onClick={updateTask}>
            Update Task
          </button>
        ) : (
          <button className="btn btn-primary w-100" onClick={addTask}>
            Add Task
          </button>
        )}
      </div>

      {/* Task List */}
      <div className="task-list mt-4">
        {tasks.length === 0 ? (
          <p className="text-muted">No tasks added yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              className={`task-box ${task.completed ? "completed-task" : ""}`}
              style={{ backgroundColor: task.color }}
            >
              <h5 className="task-title">{task.title}</h5>
              <p className="task-desc">{task.description}</p>
              <small className="text-light">
                {task.day}, {task.date}
              </small>
              <div className="task-actions">
                <input
                  type="checkbox"
                  className="me-2"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => startEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
