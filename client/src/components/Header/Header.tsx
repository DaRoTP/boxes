import React, { useContext } from "react";
import { UserContext, UserActionType } from "context/UserContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBarProps } from "./";

const ResponsiveAppBar: React.FC<AppBarProps> = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const {
    userDispatch,
    userState: { user },
  } = useContext(UserContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToLogin = () => {
    handleCloseNavMenu();
    navigate("/login");
  };
  const goToRegister = () => {
    handleCloseNavMenu();
    navigate("/register");
  };

  const logoutHandler = () => {
    handleCloseUserMenu();
    userDispatch({ type: UserActionType.LOGOUT })
    localStorage.removeItem("user");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InventoryIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="span"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
              Boxes
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages
                .filter(({ isAuth }) => (isAuth && user) || !isAuth)
                .map(({ label, callback }) => (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (callback) callback();
                    }}>
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <InventoryIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="span"
  
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
              Boxes
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
            .filter(({ isAuth }) => (isAuth && user) || !isAuth)
            .map(({ label, callback }) => (
              <Button
                key={label}
                onClick={() => {
                  handleCloseNavMenu();
                  if (callback) callback();
                }}
                sx={{ my: 2, color: "white", display: "block" }}>
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <div style={{ display: "flex" }}>
                <MenuItem onClick={goToLogin}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem onClick={goToRegister}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              </div>
            ) : (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem onClick={logoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
