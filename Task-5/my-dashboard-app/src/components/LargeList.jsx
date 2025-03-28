import React from "react";
import "../index.css";

const LargeList = React.memo(({ items }) => {
  console.log("LargeList Component Rendered");

  return (
    <div className="list-container">
      <ul>
        {items.map((flower, index) => (
          <li key={index}>{flower}</li>
        ))}
      </ul>
    </div>
  );
});

export default LargeList;
