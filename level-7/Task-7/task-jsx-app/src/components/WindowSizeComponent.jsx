import React from "react";
import useWindowResize from "../hooks/useWindowResize";
import "./WindowSizeComponent.css";

const WindowSizeComponent = () => {
  const { width, height } = useWindowResize();

  return (
    <div className="container">
      <h1>Window Size Tracker</h1>
      <p className="size-text">Width: {width}px</p>
      <p className="size-text">Height: {height}px</p>
    </div>
  );
};

export default WindowSizeComponent;
