import { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { css } from "@emotion/react";

import { AuthContext } from "./providers/AuthProvider";
import { FuriganaContext } from "./providers/FuriganaProvider";

import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./appTheme";
import TopBar from "./components/TopBar";
import StudyMenu from "./routes/study/StudyMenu";

// container for the whole viewport
const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  maxWidth: "1280px",
});

// scrolling container
const contentStyle = css({
  marginTop: baseTheme.spacing(8),
  flexGrow: 1,
  overflowY: "auto",
});

export default function App() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const [showFurigana, setShowFurigana] = useState(false);
  const toggleShowFurigana = () => setShowFurigana(!showFurigana);

  return (
    <ThemeProvider theme={baseTheme}>
      <FuriganaContext.Provider value={{ showFurigana, toggleShowFurigana }}>
        <TopBar />
        <div css={containerStyle}>
          <div css={contentStyle}>
            {isAuthenticated ? (
              <div css={{ height: "100%" }}>
                {location.pathname === "/" ? <StudyMenu /> : <Outlet />}
              </div>
            ) : (
              <div>
                <p>Please log in to see your profile.</p>
              </div>
            )}
          </div>
        </div>
      </FuriganaContext.Provider>
    </ThemeProvider>
  );
}
