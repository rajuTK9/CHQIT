import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className="register-container">
      <RegisterForm />
      <div className="login-options">
        Already have an account?
        <Link to="/login">Log in here!</Link>
      </div>
    </div>
  );
}

export default Register;
