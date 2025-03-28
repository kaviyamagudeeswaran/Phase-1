import { useState } from "react";
import "../styles/UserForm.css";

const UserForm = () => {
  const [user, setUser] = useState({ name: "", age: "" });

  return (
    <div className="user-form-container">
      <h2>User Information</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Enter Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="number"
        className="input-field"
        placeholder="Enter Age"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: e.target.value })}
      />
      <div className="display-box">
        <p>Name: {user.name || "N/A"}</p>
        <p>Age: {user.age || "N/A"}</p>
      </div>
    </div>
  );
};

export default UserForm;
