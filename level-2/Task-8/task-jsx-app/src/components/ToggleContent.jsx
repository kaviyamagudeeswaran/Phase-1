import { useState } from "react";

const ToggleContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-box">
      <h2>👁️ Toggle Content</h2>
      <button
        className="toggle-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide Content" : "Show Content"}
      </button>

      {isVisible && (
        <div className="content-box">
          <p>This is the hidden content! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default ToggleContent;
