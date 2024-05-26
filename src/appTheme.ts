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
    mode: "dark",
    background: {
      default: "#222",
    },
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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: "visible",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "8px 16px 0px 16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "text" && {
            padding: "6px 16px",
          }),
        }),
      },
    },
  },
});
