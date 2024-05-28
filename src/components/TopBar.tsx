import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Paper, Stack, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";

import { FuriganaContext } from "../providers/FuriganaProvider";
import { FuriganaToggleButton } from "./FuriganaText";
import { AuthContext } from "../providers/AuthProvider";

import LoginWithGoogle from "./login/LoginWithGoogle";
import { logout } from "../services/loginService";

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const { setIsAuthenticated } = React.useContext(AuthContext);

  // Account Menu Anchor
  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(accountAnchorEl);
  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAccountAnchorEl(null);
  };

  const handleMenuClick = (menuItem: string) => {
    if (menuItem == "logout") {
      return async () => {
        const logoutSuccess = await logout();
        if (logoutSuccess) {
          setIsAuthenticated(false);
          navigate("/", { replace: true });
          setAccountAnchorEl(null);
        }
      };
    } else {
      return () => {
        navigate(menuItem);
        setAccountAnchorEl(null);
      };
    }
  };

  const { showFurigana, toggleShowFurigana } =
    React.useContext(FuriganaContext);
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <Paper elevation={2}>
      <Stack
        direction="row"
        p={1}
        sx={{ backgroundColor: theme.palette.secondary.dark }}
      >
        <Button
          color="tertiary"
          variant={
            location.pathname.startsWith("/study") || location.pathname === "/"
              ? "outlined"
              : "text"
          }
          onClick={() => navigate("/study")}
        >
          Study
        </Button>
        <Button
          color="tertiary"
          variant={location.pathname.startsWith("/chat") ? "outlined" : "text"}
          onClick={() => navigate("/chat")}
        >
          Chat
        </Button>
        <div css={{ flexGrow: 1 }}></div>
        <FuriganaToggleButton
          showFurigana={showFurigana}
          toggleShowFurigana={toggleShowFurigana}
        />
        {isAuthenticated ? (
          <Button onClick={handleAccountClick} color="tertiary">
            <AccountBoxIcon />
          </Button>
        ) : (
          <LoginWithGoogle />
        )}

        <Menu
          anchorEl={accountAnchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClick("settings")}>
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleMenuClick("logout")}>
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Stack>
    </Paper>
  );
}
