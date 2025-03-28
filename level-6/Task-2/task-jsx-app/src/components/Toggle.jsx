import { useState } from "react";
import "../styles/Toggle.css";

const Toggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-container">
      <h2>Toggle Visibility</h2>
      <button className="toggle-btn" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && (
        <div className="toggle-content">
          🎉 This content appears and disappears when you click the button!
        </div>
      )}
    </div>
  );
};

export default Toggle;
