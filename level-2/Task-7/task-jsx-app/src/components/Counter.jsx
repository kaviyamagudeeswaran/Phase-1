import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box">
      <h2>🔢 Simple Counter</h2>
      <p className="count-value">{count}</p>
      <div className="button-container">
        <button className="decrement" onClick={() => setCount(count - 1)}>
          -
        </button>
        <button className="increment" onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
