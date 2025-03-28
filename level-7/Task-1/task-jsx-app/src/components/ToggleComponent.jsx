// src/components/ToggleComponent.jsx
import React from "react";
import useToggle from "../hooks/useToggle";

const ToggleComponent = () => {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>useToggle Hook Example</h2>
      <button onClick={toggleVisibility} style={styles.button}>
        {isVisible ? "Hide" : "Show"} Content
      </button>
      {isVisible && <p style={styles.text}>This content is visible now!</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    margin: "auto",
    marginTop: "20px",
  },
  title: {
    color: "#007bff",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  text: {
    marginTop: "15px",
    color: "#333",
    fontSize: "18px",
  },
};

export default ToggleComponent;
