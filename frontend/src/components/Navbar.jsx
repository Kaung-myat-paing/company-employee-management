import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex space-x-4">
          <Link to="/" className="font-semibold hover:text-indigo-200">
            Home
          </Link>
          <Link to="/companies" className="hover:text-indigo-200">
            Companies
          </Link>
          <Link to="/employees" className="hover:text-indigo-200">
            Employees
          </Link>
        </div>

        <div className="font-semibold hover:text-indigo-200">
            {isAuthenticated ? (
          <>
            <span className="text-sm">{user.username}</span>
            <button
              onClick={logout}
              className="bg-indigo-800 ml-3 px-3 py-1 rounded hover:bg-indigo-700 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-200 mr-4">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-indigo-200">
              Sign up
            </Link>
          </>
        )}
        </div>

      
      </div>
    </nav>
  );
}
