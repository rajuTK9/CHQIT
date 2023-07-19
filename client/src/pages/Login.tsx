import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="login-container">
      <LoginForm />
      <div className="login-options">
        Don't have an account?
        <Link to="/register">Create one here!</Link>
      </div>
    </div>
  );
}

export default Login;
