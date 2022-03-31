import { Button, Paper, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioForm } from "../components/UsuarioForm";
import { Usuario } from "../models/Usuario";
import { adicionarUsuario } from "../services/usuarioService";

export const SignUpPage: React.FC = ({}) => {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    senha: "",
  } as Usuario);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#2c3e50",
      }}
    >
      <Paper
        component={Stack}
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ p: 3, width: "50vw" }}
        elevation={10}
      >
        <Typography>Cadastre-se</Typography>
        <UsuarioForm usuario={usuario} setUsuario={setUsuario} />
        <Button
          variant="contained"
          onClick={() =>
            adicionarUsuario(usuario)
              .then(() => {
                enqueueSnackbar("Usuario cadastrado com sucesso!", {
                  variant: "success",
                });
                navigate("/login");
              })
              .catch(() =>
                enqueueSnackbar(
                  "Ocorreu um erro ao cadastrar seu usuário, verifique se os campos estão preenchidos corretamente.",
                  {
                    variant: "error",
                  }
                )
              )
          }
        >
          Cadastrar
        </Button>
      </Paper>
    </div>
  );
};
