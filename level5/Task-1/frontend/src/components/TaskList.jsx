import TaskItem from "./TaskItem";

function TaskList({ tasks, setTasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
}

export default TaskList;
