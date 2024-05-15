import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "./config";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${API_BASE_URL}/check_login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(data.loggedIn);
        //navigate("/", { replace: true });
      } else {
        throw new Error(data.message);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
