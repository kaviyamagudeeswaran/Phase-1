import React from "react";

const ChildComponent = React.memo(({ onIncrement }) => {
  console.log("ChildComponent rendered");

  return (
    <div className="child-container">
      <h3>Child Component</h3>
      <button className="child-button" onClick={onIncrement}>
        Increment from Child
      </button>
    </div>
  );
});

export default ChildComponent;
