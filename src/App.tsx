import { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "./providers/AuthProvider";
import { FuriganaContext } from "./providers/FuriganaProvider";

import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./appTheme";
import TopBar from "./components/TopBar";
import StudyMenu from "./routes/study/StudyMenu";
import { Box, styled } from "@mui/material";

const FullBox = styled(Box)({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  paddingTop: "64px",
  width: "100%",
  maxWidth: "720px",
  height: "calc(100vh - 64px)",
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
        <FullBox>
          {isAuthenticated ? (
            <div css={{ height: "100%" }}>
              {location.pathname === "/" ? <StudyMenu /> : <Outlet />}
            </div>
          ) : (
            <div>
              <p>Please log in to see your profile.</p>
            </div>
          )}
        </FullBox>
      </FuriganaContext.Provider>
    </ThemeProvider>
  );
}
