import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormikForm.css";

const FormikForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Too Short!").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: Yup.number()
      .min(18, "You must be at least 18")
      .required("Age is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Data:", values);
    resetForm();
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="formik-form">
          <div>
            <label>Name</label>
            <Field type="text" name="name" placeholder="Enter your name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label>Email</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div>
            <label>Age</label>
            <Field type="number" name="age" placeholder="Enter your age" />
            <ErrorMessage name="age" component="div" className="error" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
