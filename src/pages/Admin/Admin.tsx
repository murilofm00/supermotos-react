import { Category, Info, Label, Person, TwoWheeler } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export const AdminPage: React.FC = ({}) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Gerenciar:
        </Typography>
        <List sx={{ boxShadow: 5 }}>
          <ListItem button onClick={() => navigate("motos")}>
            <TwoWheeler sx={{ mr: 2 }} /> Motos
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate("usuarios")}>
            <Person sx={{ mr: 2 }} /> Usuarios
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate("categorias")}>
            <Category sx={{ mr: 2 }} /> Categorias
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate("marcas")}>
            <Label sx={{ mr: 2 }} /> Marcas
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate("sobre")}>
            <Info sx={{ mr: 2 }} /> Sobre a empresa
          </ListItem>
        </List>
      </Container>
      <Box sx={{ my: 3 }}>
        <Outlet />
      </Box>
    </>
  );
};
