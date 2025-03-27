import PropGreeting from "./components/PropGreeting";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1 className="colorful-heading">🎉 Prop-Based Greeting</h1>
      <PropGreeting name="Kaviya" /> {/* Change the name here dynamically */}
    </div>
  );
}

export default App;
