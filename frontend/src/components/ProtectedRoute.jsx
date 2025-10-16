import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    API.get("/auth/me")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Checking authentication...</p>;
  return auth ? children : <Navigate to="/login" />;
}