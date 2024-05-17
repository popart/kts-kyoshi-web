import { Outlet } from "react-router-dom";
import { css } from '@emotion/react';

import "./App.css";
import ChatList from "./components/ChatList";
import LoginWithGoogle from "./LoginWithGoogle";
import Logout from "./Logout";
import { useAuth } from "./AuthProvider";


const titleStyle = css({
    boxSizing: 'border-box',
    width: 300,
    height: 200
})


export default function App() {
    const { isAuthenticated } = useAuth();

  return (
    <>
      <div css={titleStyle}>This is the main page...</div>
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
