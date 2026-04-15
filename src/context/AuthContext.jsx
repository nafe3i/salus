import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (form) => {
    const res = await api.post("/login", form);

    const token = res.data.data.token;
    const user = res.data.data.user;

    localStorage.setItem("token", token);
    setUser(user);

    return user;
  };

  // REGISTER
  const register = async (form) => {
    const res = await api.post("/register", form);

    const token = res.data.data.token;
    const user = res.data.data.user;

    localStorage.setItem("token", token);
    setUser(user);

    return user;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {}

    localStorage.removeItem("token");
    setUser(null);
  };

  // GET USER (/me)
  const getUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.data);
    } catch (e) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};