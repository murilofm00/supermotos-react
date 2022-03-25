import { TextField } from "@mui/material";
import { useState } from "react";
import { Usuario } from "../models/Usuario";

interface UsuarioFormProps {
  usuario: Usuario;
  setUsuario: (usuario: Usuario) => void;
}
export const UsuarioForm: React.FC<UsuarioFormProps> = ({
  usuario,
  setUsuario,
}) => {
  function atualizarUsuario(param: string, value: any) {
    const usuarioUpdated: Usuario = { ...usuario, [param]: value };
    setUsuario(usuarioUpdated);
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Nome"
        variant="outlined"
        type="text"
        value={usuario.nome}
        onChange={(event) => atualizarUsuario("nome", event.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        value={usuario.email}
        onChange={(event) => atualizarUsuario("email", event.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Senha"
        variant="outlined"
        type="password"
        value={usuario.senha}
        onChange={(event) => atualizarUsuario("senha", event.target.value)}
      />
    </>
  );
};
