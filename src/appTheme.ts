import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    pop: Palette["primary"];
    primaryDark: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    pop?: PaletteOptions["primary"];
    primaryDark?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an pop option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    pop: true;
    primaryDark: true;
  }
}

export const baseTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      // gray
      default: "#e8e9ec",
    },
    pop: {
      // deep red
      main: "#f70301",
    },
    primary: {
      // a very light pink
      main: "#ffd4d4",
      contrastText: "#000",
    },
    primaryDark: {
      main: "#ff7a7a",
      contrastText: "#000",
    },
    secondary: {
      main: "#fff",
    },
    tertiary: {
      main: "#444",
      contrastText: "#fff",
    },
    text: {
      primary: "#111",
      secondary: "#444",
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
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "6px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});
