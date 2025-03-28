import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemedPage = () => {
  const { theme } = useTheme();

  return <h1>The current theme is {theme}.</h1>;
};

export default ThemedPage;
