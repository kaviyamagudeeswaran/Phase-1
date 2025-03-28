import { Formik, Form, Field } from "formik";
import axios from "axios";

function TaskForm({ setTasks }) {
  return (
    <Formik
      initialValues={{ title: "", description: "" }}
      onSubmit={(values, { resetForm }) => {
        axios.post("http://localhost:5000/tasks", values).then((response) => {
          setTasks((prev) => [...prev, response.data]);
          resetForm();
        });
      }}
    >
      <Form>
        <Field name="title" placeholder="Title" required />
        <Field name="description" placeholder="Description" />
        <button type="submit">Add Task</button>
      </Form>
    </Formik>
  );
}

export default TaskForm;
