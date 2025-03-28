import { useState } from "react";
import "../styles/InputField.css";

const InputField = () => {
  const [text, setText] = useState("");

  return (
    <div className="input-container">
      <h2>Live Input Preview</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && <div className="display-text">You Typed: {text}</div>}
    </div>
  );
};

export default InputField;
