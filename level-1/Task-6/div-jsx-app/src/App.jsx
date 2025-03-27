import DynamicBox from "./components/DynamicBox";
import "./index.css"; // Import global styles

function App() {
  return (
    <div className="container">
      <h2 className="colorful-heading">🌈 Colorful Message Boxes 🎨</h2>
      <DynamicBox bgColor="tomato" text="🔥 Stay Motivated!" />
      <DynamicBox bgColor="blueviolet" text="🎨 Creativity Unleashed!" />
      <DynamicBox bgColor="darkcyan" text="🌊 Keep Moving Forward!" />
    </div>
  );
}

export default App;
