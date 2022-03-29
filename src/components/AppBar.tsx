import * as React from "react";
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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { isLogado, usuario, logout } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClickMenu(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function navegarMenu(path: string) {
    navigate(path);
    handleCloseMenu();
  }

  function onClickLogout() {
    logout();
    handleCloseMenu();
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "#2c3e50" }}>
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            SUPER MOTOS
          </Typography>
          {isLogado ? (
            <>
              <Avatar alt={usuario?.nome} onClick={handleClickMenu}>
                {usuario?.nome[0]}
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => navegarMenu("/perfil")}>
                  Perfil
                </MenuItem>
                {usuario?.isAdmin && (
                  <MenuItem onClick={() => navegarMenu("admin")}>
                    Painel Administrativo
                  </MenuItem>
                )}
                <MenuItem onClick={() => onClickLogout()}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => navegarMenu("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
