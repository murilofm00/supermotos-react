import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { isLogado, usuario, logout } = useAuthContext();

  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  function handleClickMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElMenu(event.currentTarget);
  }

  function handleClickNav(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorElMenu(null);
  }

  function handleCloseNav() {
    setAnchorElNav(null);
  }

  function navegarMenu(path: string) {
    navigate(path);
    handleCloseMenu();
  }

  function navegarNav(path: string) {
    navigate(path);
    handleCloseNav();
  }

  function onClickLogout() {
    logout();
    handleCloseMenu();
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "#2c3e50" }}>
      <Container>
        <Toolbar>
          <IconButton
            sx={{ mr: 1, display: { xs: "flex", md: "none" } }}
            color="inherit"
            onClick={handleClickNav}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNav}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navegarMenu("/motos")}>Motos</MenuItem>
            <MenuItem onClick={() => navegarMenu("/sobre")}>Sobre</MenuItem>
            <MenuItem onClick={() => navegarMenu("/contato")}>Contato</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            SUPER MOTOS
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              ml: 2,
              // flexGrow: 1,
              color: "gray",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#dfdfdf" }}
              onClick={() => navigate("/motos")}
            >
              MOTOS
            </Button>
            <Button
              variant="text"
              sx={{ color: "#dfdfdf" }}
              onClick={() => navigate("/sobre")}
            >
              SOBRE
            </Button>
            <Button
              variant="text"
              sx={{ color: "#dfdfdf" }}
              onClick={() => navigate("/contato")}
            >
              CONTATO
            </Button>
          </Stack>
          <Box id="spacer" sx={{ display: "flex", flexGrow: 1 }} />
          {isLogado ? (
            <>
              <Avatar alt={usuario?.nome} onClick={handleClickMenu}>
                {usuario?.nome[0]}
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorElMenu}
                open={Boolean(anchorElMenu)}
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
