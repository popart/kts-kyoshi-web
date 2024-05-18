import { Outlet, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import "./App.css";
import ChatList from "./components/ChatList";
import LoginWithGoogle from "./components/login/LoginWithGoogle";
import Logout from "./components/login/Logout";
import { useAuth } from "./providers/AuthProvider";

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
  padding: "0 10px",
});

const contentStyle = css({
  flexGrow: 1,
  overflowY: "auto",
});

const homeIconStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  backgroundColor: "#1a1a1a",
  borderRadius: "4px",
});

export default function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div css={containerStyle}>
      <div css={bannerStyle}>
        {location.pathname !== "/" ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <button css={homeIconStyle}>
              <HomeIcon />
            </button>
          </Link>
        ) : (
          <div></div>
        )}
        <div>Kyoshi Tutor!</div>
        <div>{isAuthenticated ? <Logout /> : <LoginWithGoogle />}</div>
      </div>
      <div css={contentStyle}>
        {isAuthenticated ? (
          <div css={{ height: "100%" }}>
            {location.pathname === "/" ? <ChatList /> : <Outlet />}
          </div>
        ) : (
          <div>
            <p>Please log in to see your profile.</p>
          </div>
        )}
      </div>
    </div>
  );
}
