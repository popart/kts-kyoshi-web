import { useEffect, Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext } from "react";

import { API_BASE_URL } from "./config";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
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
