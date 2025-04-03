import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Correct Bootstrap Import
import "./styles/styles.css"; // ✅ Custom Styles

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
