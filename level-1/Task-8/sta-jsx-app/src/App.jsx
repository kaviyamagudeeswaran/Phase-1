import RoleMessage from "./components/RoleMessage";
import "./index.css";

function App() {
  const userRole = "admin"; // Change to "user" or "" to see different outputs

  return (
    <div className="container">
      <h2 className="colorful-heading">🛠️ Role-Based Access</h2>
      <RoleMessage role={userRole} />
    </div>
  );
}

export default App;
