import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Usuario } from "../../models/Usuario";
import {
  adicionarUsuario,
  atualizarUsuario,
  getUsuario,
} from "../../services/usuarioService";
import {
  Alert,
  Button,
  Container,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { UsuarioForm } from "../../components/UsuarioForm";
import { useSnackbar } from "notistack";

interface EditarUsuarioPageProps {
  tipo: "add" | "edit";
}

export const EditarUsuarioPage: React.FC<EditarUsuarioPageProps> = ({
  tipo,
}) => {
  const usuarioId = parseInt(useParams().usuarioId as string);
  const { enqueueSnackbar } = useSnackbar();

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    senha: "",
    isAdmin: false,
  } as Usuario);

  useEffect(() => {
    if (tipo === "edit") {
      if (usuarioId && !isNaN(usuarioId))
        getUsuario(usuarioId).then((result) => setUsuario(result.data));
    }
  }, []);

  function salvar() {
    if (usuario) {
      if (tipo === "add") {
        adicionarUsuario(usuario)
          .then(({ data }) => {
            if (data.id) {
              enqueueSnackbar("Usuario adicionado.", {
                variant: "success",
              });
              setUsuario(data);
            }
          })
          .catch(() => {
            enqueueSnackbar("Erro ao adicionar o usuario, tente novamente.", {
              variant: "error",
            });
          });
      } else if (tipo === "edit") {
        atualizarUsuario(usuarioId, usuario)
          .then(({ data }) => {
            if (data.id) {
              enqueueSnackbar("Usuario atualizado.", {
                variant: "success",
              });
              setUsuario(data);
            }
          })
          .catch(() => {
            enqueueSnackbar("Erro ao atualizar o usuario, tente novamente.", {
              variant: "error",
            });
          });
      }
    }
  }

  return (
    <Stack spacing={3} component={Container}>
      <Typography variant="h4">
        {tipo === "add" ? "Adicionar" : "Editar"} Usuário
      </Typography>
      {usuario || tipo === "add" ? (
        <>
          <UsuarioForm usuario={usuario} setUsuario={setUsuario} />

          <Stack direction="row" alignItems="baseline">
            <Switch
              value={usuario?.isAdmin}
              checked={usuario?.isAdmin}
              onChange={(event) =>
                setUsuario({ ...usuario, isAdmin: event.target.checked })
              }
            />
            <Typography>Administrador</Typography>
          </Stack>
          <Button variant="contained" onClick={salvar}>
            Salvar
          </Button>
          <Button component={Link} to="/admin/usuarios">
            Voltar
          </Button>
        </>
      ) : (
        <>
          <Alert severity="error">Selecione um usuário válido.</Alert>
          <Button component={Link} to="/admin/usuarios" variant="contained">
            Voltar
          </Button>
        </>
      )}
    </Stack>
  );
};
