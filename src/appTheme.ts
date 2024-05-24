import { brown } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  palette: {
    primary: {
      main: brown[600],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: brown[300],
          },
        },
      },
    },
  },
});
