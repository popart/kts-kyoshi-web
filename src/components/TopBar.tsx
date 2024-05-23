import React from "react";

import { AppBar, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import { FuriganaContext } from "../providers/FuriganaProvider";
import { FuriganaToggleButton } from "./FuriganaText";
import { AuthContext } from "../providers/AuthProvider";

import LoginWithGoogle from "./login/LoginWithGoogle";
import Logout from "./login/Logout";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  // Menu Anchor
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (menuItem: string) => {
    return () => {
      navigate(menuItem)
    setAnchorEl(null);
    };
  };

  const { showFurigana, toggleShowFurigana } =
    React.useContext(FuriganaContext);
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Button onClick={handleClick} color="inherit">
          <MenuIcon />
        </Button>
        <div css={{ flexGrow: 1 }}>Kyoshi</div>
        <span css={{ margin: "0 10px" }}>
          <FuriganaToggleButton
            showFurigana={showFurigana}
            toggleShowFurigana={toggleShowFurigana}
          />
        </span>
        {isAuthenticated ? <Logout /> : <LoginWithGoogle />}
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleMenuClick("/")}>Chat</MenuItem>
        <MenuItem onClick={handleMenuClick("/study")}>
          Study
        </MenuItem>
        <MenuItem onClick={handleMenuClick("/account")}>
          Account
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
