import React from "react";
import useLocalStorage from "../hooks/useLocalStorage"; // Import hook

const LocalStorageComponent = () => {
  const [value, setValue] = useLocalStorage("name", "Guest");

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Local Storage Hook</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={styles.input}
      />
      <p style={styles.text}>Stored Value: {value}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    border: "2px solid #4CAF50",
    borderRadius: "10px",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
  },
  heading: { color: "#4CAF50" },
  input: {
    padding: "10px",
    width: "80%",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  text: { color: "#333", marginTop: "10px", fontSize: "18px" },
};

export default LocalStorageComponent;
