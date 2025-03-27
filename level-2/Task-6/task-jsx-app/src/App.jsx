import UserInfo from "./components/UserInfo";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1 className="colorful-heading">🎉 PropTypes Validation</h1>

      {/* Correct types */}
      <UserInfo name="Kaviya" age={19} city="Dindigul" />

      {/* Incorrect types (will show console warnings) */}
      <UserInfo name={1234} age="20" city="Not specified" />
    </div>
  );
}

export default App;
