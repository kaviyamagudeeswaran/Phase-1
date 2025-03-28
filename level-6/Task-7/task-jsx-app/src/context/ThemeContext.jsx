import React, { createContext, useContext, useState } from "react";

// Create a context
const ThemeContext = createContext();

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
