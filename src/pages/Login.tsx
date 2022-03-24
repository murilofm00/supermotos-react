import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

export const LoginPage: React.FC = ({}) => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <Button variant="contained" onClick={() => login(email, senha)}>
          Login
        </Button>
      </Paper>
    </div>
  );
};
