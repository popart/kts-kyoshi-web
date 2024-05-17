import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { logout } from "../../services/loginService";

export default function Logout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const logoutUser = async () => {
    const logoutSuccess = await logout();
    if (logoutSuccess) {
      setIsAuthenticated(false);
      navigate("/", { replace: true });
    }
  };

  return <button onClick={logoutUser}>Logout</button>;
}
