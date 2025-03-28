import React, { useRef } from "react";
import "../styles/styles.css";

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="focus-container">
      <h2>useRef DOM Manipulation</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type here..."
        className="input-field"
      />
      <button onClick={handleFocus} className="focus-button">
        Focus Input
      </button>
    </div>
  );
};

export default FocusInput;
