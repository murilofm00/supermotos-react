import { Avatar, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { Comentario } from "../models/Comentario";

interface ComentarioListItemProps {
  comentario: Comentario;
}
export const ComentarioListItem: React.FC<ComentarioListItemProps> = ({
  comentario,
}) => {
  return (
    <ListItem sx={{ border: 1, borderColor: "#d4d4d4" }}>
      <Avatar alt={comentario.usuario.nome} sx={{ m: 2 }}>
        {comentario.usuario.nome[0]}
      </Avatar>
      <Stack>
        <Typography variant="subtitle1">{comentario.usuario.nome}</Typography>
        <Typography>{comentario.comentario}</Typography>
      </Stack>
    </ListItem>
  );
};
