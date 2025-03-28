import React from "react";
import { useTheme } from "./context/ThemeContext";
import ThemedPage from "./components/ThemedPage";
import ThemeToggle from "./components/ThemeToggle";
import "./styles.css"; // Import CSS file

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <ThemedPage />
      <ThemeToggle />
    </div>
  );
};

export default App;
