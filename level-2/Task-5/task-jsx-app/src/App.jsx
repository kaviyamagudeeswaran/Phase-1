import UserDetails from "./components/UserDetails";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1 className="colorful-heading">🎉 Multiple Props Example</h1>

      {/* Passing multiple props */}
      <UserDetails name="Kaviya" age={19} city="Dindigul" />
      <UserDetails name="Rahul" age={30} city="Mumbai" />
    </div>
  );
}

export default App;
