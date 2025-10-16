import { useEffect, useState, createContext, useContext } from "react";
import API from "../api";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await API.get("/auth/me");
        if (!ignore) setUser(res.data);
      } catch {
        if (!ignore) setUser(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const login = async ({ username, password }) => {
    await API.post("/auth/login", { username, password });
    const res = await API.get("/auth/me");
    setUser(res.data);
  };

  const signup = async ({ username, password }) => {
    await API.post("/auth/register", { username, password });
    const res = await API.get("/auth/me");
    setUser(res.data);
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
