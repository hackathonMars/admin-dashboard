import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (name, password) => {
    try {
      const response = await axios.get("http://localhost:3007/workers");

      console.log("Workers Data:", response.data);

      const user = response.data.find(
        (worker) => worker.name === name && worker.password === password
      );
      console.log("Input name:", name, "Input password:", password);
      console.log("Matched User:", user);

      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => { }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
