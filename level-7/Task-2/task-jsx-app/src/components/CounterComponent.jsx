import React from "react";
import useCounter from "../hooks/useCounter";
import "./CounterComponent.css"; // Importing styles

const CounterComponent = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <div className="button-group">
        <button className="counter-btn increment" onClick={increment}>
          +
        </button>
        <button className="counter-btn decrement" onClick={decrement}>
          -
        </button>
        <button className="counter-btn reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;
