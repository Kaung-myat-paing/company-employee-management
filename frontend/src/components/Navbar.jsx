import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = async () => {
    await API.post("/auth/logout");
    navigate("/login");
  };
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
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
        <Link to="/signup" style={{ color: "#fff", marginLeft: 10 }}>
          Register
        </Link>
      </div>
      <button onClick={logout} style={{ background: "#555", color: "#fff" }}>
        Logout
      </button>
    </nav>
  );
}
