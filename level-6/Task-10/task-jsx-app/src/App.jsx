import React, { useState, useCallback } from "react";
import ChildComponent from "./components/ChildComponent";
import "./styles.css";

const App = () => {
  const [count, setCount] = useState(0);

  // Memoized callback function using useCallback
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className="app-container">
      <h2>useCallback Memoized Callback</h2>
      <p>Parent Count: {count}</p>
      <button className="increment-button" onClick={handleIncrement}>
        Increment
      </button>
      <ChildComponent onIncrement={handleIncrement} />
    </div>
  );
};

export default App;
