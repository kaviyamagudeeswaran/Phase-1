import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <button className="login-btn" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;
