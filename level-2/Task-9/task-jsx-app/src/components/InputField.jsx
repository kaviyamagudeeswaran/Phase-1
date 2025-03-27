import { useState } from "react";

const InputField = () => {
  const [text, setText] = useState("");

  return (
    <div className="input-box">
      <h2>📝 Dynamic Input</h2>
      <input
        type="text"
        className="text-input"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="display-text">
        You typed: <strong>{text}</strong>
      </p>
    </div>
  );
};

export default InputField;
