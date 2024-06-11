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
  height: "calc(100dvh - 52.5px)",
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
                <p>Please log in to get started.</p>
                <p>
                  <b>What is this?</b>
                </p>
                <p>
                  It's an app to help with immersion learning for Japanese. You
                  type in a Japanese sentence, and then it translates it and
                  explains the grammar. Based on that explanation, it creates
                  flash cards that you can review using a spaced repetition
                  system (SRS) in the app. It's very basic, so please watch the
                  video before trying to use it.
                </p>
                <p>Demo/how-to-use in the video below!</p>
                <video width="320" height="240" controls>
                  <source src="/goginko_demo.mp4" type="video/mp4" />
                </video>
              </div>
            )}
          </FullBox>
        </Container>
      </FuriganaContext.Provider>
    </ThemeProvider>
  );
}
