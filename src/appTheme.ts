import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    peach: Palette["primary"];
  }

  interface PaletteOptions {
    peach?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an peach option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    peach: true;
  }
}

export const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#e7ad92", // peach
      contrastText: "#65383a", // dark cherry
    },
    secondary: {
      // a bluish gray
      light: "#cbc5c2",
      main: "#868e81",
      dark: "#596d69",
      contrastText: "#ddd",
    },
    peach: {
      main: "#feeccd", // pale pink/yellow
      dark: "#e7ad92", // peach
      contrastText: "#65383a", // dark cherry
    },
  },
});
