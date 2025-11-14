import React, { createContext, useState, useContext, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (use local storage here for simplicity)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Register a new user (simulated here)
  const registerUser = (userData) => {
    const newUser = { ...userData, _id: new Date().toISOString() };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Login user (simulated here)
  const loginUser = (credentials) => {
    // Simulate successful login by directly setting the user
    const loggedInUser = {
      _id: new Date().toISOString(),
      email: credentials.email,
    };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
