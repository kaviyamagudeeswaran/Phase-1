import Greeting from "./components/Greeting";
import "./index.css";

function App() {
  const userLoggedIn = true; // Change to false to test both cases

  return (
    <div className="container">
      <h1 className="colorful-heading">🔀 Conditional Rendering</h1>
      <Greeting isLoggedIn={userLoggedIn} />
    </div>
  );
}

export default App;
