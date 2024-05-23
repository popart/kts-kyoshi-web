import { useEffect, Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext } from "react";

import { checkLogin } from "../services/loginService";


interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // need to define an async function
    const refreshLogin = async () => {
      const loggedIn = await checkLogin();
      setIsAuthenticated(loggedIn);
    };

    refreshLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
