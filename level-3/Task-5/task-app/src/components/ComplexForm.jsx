import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../index.css";

// Validation Schema
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive()
    .integer()
    .required("Age is required"),
});

const ComplexForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      <h2>Complex Form with Validation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" {...register("name")} />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" {...register("age")} />
          <p className="error">{errors.age?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ComplexForm;
