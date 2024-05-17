import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

import "./App.css";
import ChatList from "./components/ChatList";
import LoginWithGoogle from "./components/login/LoginWithGoogle";
import Logout from "./components/login/Logout";
import { useAuth } from "./AuthProvider";

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

const bannerStyle = css({
  height: "60px",
  flexShrink: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#333", // Change this to whatever color you want
  color: "white",
});

const contentStyle = css({
  flexGrow: 1,
});

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div css={containerStyle}>
      <div css={bannerStyle}>
        <div css={{ padding: '0 10px' }}>Kyoshi Tutor!</div>
        <div css={{padding: '0 10px' }}>
          {isAuthenticated ? <Logout /> : <LoginWithGoogle />}
        </div>
      </div>
      <div css={contentStyle}>
        {isAuthenticated ? (
          <div>
            <ChatList />
          </div>
        ) : (
          <div>
            <p>Please log in to see your profile.</p>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
