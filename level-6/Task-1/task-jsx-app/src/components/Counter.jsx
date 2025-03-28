import { useState } from "react";
import "../styles/Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2>Interactive Counter</h2>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button className="btn increment" onClick={() => setCount(count + 1)}>
          +
        </button>
        <button className="btn decrement" onClick={() => setCount(count - 1)}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
