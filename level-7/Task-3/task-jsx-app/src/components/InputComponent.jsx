import React from "react";
import useInput from "../hooks/useInput";
import "./InputComponent.css"; // Importing styles

const InputComponent = () => {
  const { value, onChange, inputRef } = useInput("");

  return (
    <div className="input-container">
      <h2>Enter Text</h2>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type here..."
      />
      <p>Typed: {value}</p>
    </div>
  );
};

export default InputComponent;
