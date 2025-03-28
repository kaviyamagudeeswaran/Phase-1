import React, { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./TitleComponent.css";

const TitleComponent = () => {
  const [count, setCount] = useState(0);

  useDocumentTitle(`Count: ${count}`);

  return (
    <div className="container">
      <h1>Dynamic Document Title</h1>
      <p className="counter">Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default TitleComponent;
