import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoadingProvider } from "./context/LoadingContext";
import "./styles.css"; // Import the CSS file

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
