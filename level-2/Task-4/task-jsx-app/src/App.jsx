import DefaultPropGreeting from "./components/DefaultPropGreeting";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1 className="colorful-heading">🎉 Default Props Greeting</h1>

      {/* With a prop */}
      <DefaultPropGreeting name="Kaviya" />

      {/* Without a prop (default will be used) */}
      <DefaultPropGreeting />
    </div>
  );
}

export default App;
