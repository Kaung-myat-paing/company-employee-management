import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Checking authentication...</p>;
  return isAuthenticated ? children : <Navigate to="/login" replace state={{from: location}} />;
}
