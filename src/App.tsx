import { useState } from "react";
import { Link,  Outlet, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import HomeIcon from "@mui/icons-material/Home";
import BiotechIcon from "@mui/icons-material/Biotech";

import "./App.css";
import ChatList from "./components/ChatList";
import LoginWithGoogle from "./components/login/LoginWithGoogle";
import Logout from "./components/login/Logout";
import { useAuth } from "./providers/AuthProvider";
import { FuriganaContext } from "./providers/FuriganaProvider";
import { FuriganaToggleButton } from "./components/FuriganaText";

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  maxWidth: "1280px",
});

const bannerStyle = css({
  height: "60px",
  flexShrink: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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

  const [showFurigana, setShowFurigana] = useState(false);
  const toggleShowFurigana = () => setShowFurigana(!showFurigana);

  return (
    <FuriganaContext.Provider value={{ showFurigana, toggleShowFurigana }}>
      <div css={containerStyle}>
        <div css={bannerStyle}>
          {location.pathname !== "/" ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <button css={homeIconStyle}>
                <HomeIcon />
              </button>
            </Link>
          ) : (
            <Link to="/study" style={{ textDecoration: "none" }}>
              <button css={homeIconStyle}>
                <BiotechIcon />
              </button>
            </Link>
          )}
          <div>Kyoshi Tutor!</div>
          <div>
            <span css={{margin: '0 10px'}}><FuriganaToggleButton showFurigana={showFurigana} toggleShowFurigana={toggleShowFurigana} /></span>
            {isAuthenticated ? <Logout /> : <LoginWithGoogle />}
          </div>
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
    </FuriganaContext.Provider>
  );
}
