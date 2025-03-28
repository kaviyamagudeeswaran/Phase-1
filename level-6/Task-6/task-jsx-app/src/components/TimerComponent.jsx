import { useEffect, useState } from "react";
import "../styles/TimerComponent.css";

const TimerComponent = () => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      console.log("Timer is running...");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Timer stopped.");
    };
  }, [isRunning]);

  return (
    <div className="timer-container">
      <h2>useEffect Cleanup Example</h2>
      <p className="timer-message">
        {isRunning
          ? "Timer is running... Check the console!"
          : "Timer is stopped."}
      </p>
      <button
        className="toggle-button"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "Stop Timer" : "Start Timer"}
      </button>
    </div>
  );
};

export default TimerComponent;
