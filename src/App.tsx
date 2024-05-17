import { Outlet } from "react-router-dom";

import "./App.css";
import ChatList from "./components/ChatList";
import LoginWithGoogle from "./LoginWithGoogle";
import Logout from "./Logout";
import { useAuth } from "./AuthProvider";


export default function App() {
    const { isAuthenticated } = useAuth();

  return (
    <>
      This is the main page...
      {isAuthenticated ? (
        <div>
          <ChatList />
          <Logout />
        </div>
      ) : (
        <div>
          <p>Please log in to see your profile.</p>
          <LoginWithGoogle />
        </div>
      )}
      <Outlet />
    </>
  );
}
