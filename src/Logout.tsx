import { useNavigate } from 'react-router-dom';
import { API_BASE_URL} from "./config";


export default function Logout() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    console.log("WTF LOGOUT")
    const res = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: 'include',
    });
    if (res.ok) {
      navigate('/', { replace: true });
      window.location.reload();
    } else {
      console.error('Logout failed:', res.statusText);
    }
  }
  return (
    <button onClick={logoutUser}>Logout</button>
  );
}
