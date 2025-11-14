import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if the user is not authenticated
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      <h1>Welcome to TaskMaster</h1>
      {user ? (
        <div>
          <h3>Hello, {user.email}</h3>
          <p>Manage your tasks effectively with TaskMaster</p>
        </div>
      ) : (
        <p>Please login to access your tasks.</p>
      )}
    </div>
  );
};

export default Home;
