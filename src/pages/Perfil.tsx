import { Button, Container, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioForm } from "../components/UsuarioForm";
import { useAuthContext } from "../Context/AuthContext";
import { Usuario } from "../models/Usuario";
import { atualizarUsuario } from "../services/usuarioService";

export const PerfilPage: React.FC = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { usuario, logout } = useAuthContext();
  const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario>({
    id: usuario?.id,
    email: usuario?.email,
    nome: usuario?.nome,
    senha: "",
  } as Usuario);

  return (
    <Container>
      <Stack spacing={2}>
        <UsuarioForm usuario={usuarioPerfil} setUsuario={setUsuarioPerfil} />
        <Button
          variant="contained"
          onClick={() =>
            atualizarUsuario(usuarioPerfil.id, usuarioPerfil)
              .then(() => {
                enqueueSnackbar(
                  "Seu usuário atualizado, faça login novamente para que as alterações tenham efeito.",
                  { variant: "success" }
                );
                logout();
                navigate("/login");
              })
              .catch(() =>
                enqueueSnackbar("Erro ao atualizar usuário", {
                  variant: "error",
                })
              )
          }
        >
          Salvar
        </Button>
      </Stack>
    </Container>
  );
};
