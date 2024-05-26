import { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "./providers/AuthProvider";
import { FuriganaContext } from "./providers/FuriganaProvider";

import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./appTheme";
import TopBar from "./components/TopBar";
import StudyMenu from "./routes/study/StudyMenu";
import { Box, Container, CssBaseline, styled } from "@mui/material";

const FullBox = styled(Box)({
  width: "100%",
  height: "calc(100vh - 52.5px)",
});

export default function App() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const [showFurigana, setShowFurigana] = useState(false);
  const toggleShowFurigana = () => setShowFurigana(!showFurigana);

  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <FuriganaContext.Provider value={{ showFurigana, toggleShowFurigana }}>
        <TopBar />
        <Container maxWidth="md">
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
        </Container>
      </FuriganaContext.Provider>
    </ThemeProvider>
  );
}
