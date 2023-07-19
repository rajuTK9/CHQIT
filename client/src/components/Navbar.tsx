import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="navbar">
      <div className="nav-logo">CHQIT</div>
      {user.name ? (
        <div className="nav-user-info">
          <h3 className="user-name-heading">
            <span className="user-greeting">Welcome </span>
            <span className="user-name">{user.name}</span>
          </h3>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
