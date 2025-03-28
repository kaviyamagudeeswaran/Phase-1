import React from "react";

const ChildButton = React.memo(({ increment }) => {
  console.log("ChildButton Rendered");
  return <button onClick={increment}>Increment Counter</button>;
});

export default ChildButton;
