import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import { AuthContext } from "../../providers/AuthProvider";
import { logout } from "../../services/loginService";

export default function Logout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = React.useContext(AuthContext);

  const logoutUser = async () => {
    const logoutSuccess = await logout();
    if (logoutSuccess) {
      setIsAuthenticated(false);
      navigate("/", { replace: true });
    }
  };

  return <Button onClick={logoutUser} color="inherit">Logout</Button>;
}
