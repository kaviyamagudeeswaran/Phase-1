import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthContext provider
import Home from "./pages/Home"; // Home page
import Login from "./pages/Login"; // Login page
import Register from "./pages/Register"; // Register page
import TaskList from "./components/TaskList"; // Task list page
import Navbar from "./components/Navbar"; // Navbar component
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* AuthProvider wraps the entire app to provide authentication context */}
      <Router>
        <Navbar /> {/* Render Navbar for navigation */}
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks" element={<TaskFilters />} />
            <Route path="/tasks" element={<TaskForm />} />
            {/* Add any other routes here */}
            {/* Add any other routes here */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
