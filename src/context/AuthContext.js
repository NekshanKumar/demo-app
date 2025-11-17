import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken, issueStaticToken } from "../utils/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log("AuthProvider - token on mount:", token);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[0]));
        setUser({ username: payload.username });
        console.log("AuthProvider - user restored:", payload.username);
      } catch (err) {
        console.log("AuthProvider - invalid token, clearing...");
        removeToken();
        setUser(null);
      }
    } else {
      console.log("AuthProvider - no token found, user null");
    }
    setLoading(false);
  }, []);

  function login({ username, password }) {
    console.log("AuthProvider - login attempt:", username);
    if (username === "niks" && password === "123") {
      const token = issueStaticToken(username);
      setToken(token);
      setUser({ username });
      console.log("AuthProvider - login success, token set:", token);
      return true;
    } else {
      console.log("AuthProvider - login failed");
      return false;
    }
  }

  function logout() {
    console.log("AuthProvider - logout triggered");
    removeToken();
    setUser(null);
  }

  function isAuthenticated() {
    const hasToken = !!getToken();
    console.log("AuthProvider - isAuthenticated:", hasToken);
    return hasToken;
  }

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
