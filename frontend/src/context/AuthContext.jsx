// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // ✅ NUEVO
  const navigate = useNavigate();

  const login = (token, role, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    setToken(token);
    setRole(role);
    setUserId(userId); // ✅ NUEVO
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // ✅ NUEVO
    setToken(null);
    setRole(null);
    setUserId(null); // ✅ NUEVO
    navigate("/");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, role, userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
