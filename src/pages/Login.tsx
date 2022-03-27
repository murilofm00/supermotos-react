import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export const LoginPage: React.FC = ({}) => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  function doLogin() {
    login(email, senha)
      .then(() => {
        enqueueSnackbar("Login realizado com sucesso!", {
          variant: "success",
        });
        navigate("/");
      })
      .catch(() =>
        enqueueSnackbar(
          "Ocorreu um erro ao logar, verifique seu email e senha.",
          {
            variant: "error",
          }
        )
      );
  }

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
        sx={{ p: 3 }}
        elevation={10}
      >
        <Typography>Login</Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <Button variant="contained" onClick={doLogin}>
          Login
        </Button>
        <Button size="small" onClick={() => navigate("/signup")}>
          Criar conta
        </Button>
      </Paper>
    </div>
  );
};
