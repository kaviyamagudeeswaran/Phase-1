import React, { useReducer } from "react";
import "../styles/styles.css";

// Reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="counter-container">
      <h2>Counter: {state.count}</h2>
      <div className="button-group">
        <button
          className="increment"
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          +
        </button>
        <button
          className="decrement"
          onClick={() => dispatch({ type: "DECREMENT" })}
        >
          -
        </button>
        <button className="reset" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
