import axios from "axios";

function TaskItem({ task, setTasks }) {
  const toggleComplete = () => {
    axios
      .put(`http://localhost:5000/tasks/${task.id}`, {
        completed: !task.completed,
      })
      .then((response) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? response.data : t))
        );
      });
  };

  const deleteTask = () => {
    axios.delete(`http://localhost:5000/tasks/${task.id}`).then(() => {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default TaskItem;
