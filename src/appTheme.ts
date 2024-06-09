import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    tertiaryDark: Palette["primary"];
    pop: Palette["primary"];
    primaryDark: Palette["primary"];
    topBar: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    tertiaryDark?: PaletteOptions["primary"];
    pop?: PaletteOptions["primary"];
    primaryDark?: PaletteOptions["primary"];
    topBar?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an pop option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    tertiaryDark: true;
    pop: true;
    primaryDark: true;
    topBar: true;
  }
}

declare module "@mui/material/Stack" {
  interface StackPropsColorOverrides {
    topBar: true;
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
      // peach
      main: "#fff",
      contrastText: "#000",
    },
    primaryDark: {
      main: "#fe8936",
      contrastText: "#000",
    },
    secondary: {
      main: "#fff",
      dark: "#ccc",
    },
    tertiary: {
      main: "#f1f3ff",
      contrastText: "#eee",
    },
    tertiaryDark: {
      main: "#1e367c",
      contrastText: "#eee",
    },
    topBar: {
      main: "#465a93",
    },
    text: {
      primary: "#111",
      secondary: "#565d70",
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
          backgroundColor: "#eee",
        },
      },
    },
  },
});
