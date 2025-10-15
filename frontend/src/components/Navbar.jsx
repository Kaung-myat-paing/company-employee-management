import { Link } from "react-router-dom";

export default function Navbar() {
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
        <Link to="/employees" style={{ color: "#fff" }}>
          Employees
        </Link>
      </div>
    </nav>
  );
}
