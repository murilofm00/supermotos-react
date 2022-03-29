import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { Usuario } from "../../models/Usuario";
import { excluirUsuario, listarUsuarios } from "../../services/usuarioService";

export const EditarUsuariosPage: React.FC = ({}) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    listarUsuarios().then((result) => {
      setUsuarios(result.data);
    });
  }

  function abrirModalDelete(usuario: Usuario) {
    setSelectedUsuario(usuario);
    setDialogOpen(true);
  }

  function onCloseModal(agreed: boolean) {
    if (agreed) {
      if (selectedUsuario)
        excluirUsuario(selectedUsuario?.id).then(() => {
          closeModal();
          enqueueSnackbar("Usuario excluido.", {
            variant: "success",
          });
          carregarUsuarios();
        });
    } else {
      closeModal();
    }
  }

  function closeModal() {
    setDialogOpen(false);
    setSelectedUsuario(undefined);
  }

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Usuários
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={() => navigate("admin/usuarios/add")}
      >
        Adicionar
      </Button>
      <List>
        {usuarios.map((usuario) => {
          return (
            <ListItem
              key={usuario.id}
              sx={{ background: "#d5d5d5", p: 1.5 }}
              dense
              secondaryAction={
                <>
                  <IconButton
                    onClick={() =>
                      navigate(`/admin/usuarios/edit/${usuario.id}`)
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => abrirModalDelete(usuario)}>
                    <Delete color="error" />
                  </IconButton>
                </>
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <Typography>{usuario.nome}</Typography>
                  <Typography>{usuario.email}</Typography>
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
      <ConfirmDialog
        open={dialogOpen}
        title={`Remover ${selectedUsuario?.nome}`}
        text={`Deseja remover o usuario de nome: "${selectedUsuario?.nome}" e email: "${selectedUsuario?.email}"`}
        onCloseModal={onCloseModal}
      />
    </Container>
  );
};
