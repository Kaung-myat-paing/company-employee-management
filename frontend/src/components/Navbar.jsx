import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  return (
    <nav
      style={{
        background: "#333",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: 10 }}>
          Home
        </Link>
        <Link to="/companies" style={{ color: "#fff", marginRight: 10 }}>
          Companies
        </Link>
        <Link to="/employees" style={{ color: "#fff", marginRight: 10 }}>
          Employees
        </Link>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: "10px" }}>{user.username}</span>
            <button
              onClick={logout}
              style={{ background: "#555", color: "#fff" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: 10 }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "#fff" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
