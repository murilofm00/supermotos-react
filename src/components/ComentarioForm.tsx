import {
  Alert,
  Avatar,
  Button,
  Card,
  CardMedia,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { Comentario } from "../models/Comentario";
import { adicionarComentario } from "../services/comentarioService";

interface ComentarioFormProps {
  motoId: number;
  onComment: (comentario: Comentario) => void;
}
export const ComentarioForm: React.FC<ComentarioFormProps> = ({
  motoId,
  onComment,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { usuario, isLogado } = useAuthContext();

  const [comentario, setComentario] = useState<string>("");

  function comentar() {
    adicionarComentario({
      comentario: comentario,
      idMoto: motoId,
      idUsuario: usuario?.id,
    } as Comentario)
      .then(({ data }) => {
        enqueueSnackbar("Comentário postado.", { variant: "success" });
        onComment(data);
        setComentario("");
      })
      .catch(() =>
        enqueueSnackbar("Erro ao comentar, tente novamente.", {
          variant: "error",
        })
      );
  }

  return isLogado ? (
    <Card sx={{ display: "flex", border: 1, borderColor: "#d4d4d4", my: 2 }}>
      <CardMedia sx={{ display: "flex", alignItems: "center", mx: 3 }}>
        <Avatar>{usuario?.nome[0]}</Avatar>
      </CardMedia>
      <Stack direction={"row"} sx={{ my: 3, flexGrow: 1 }} alignItems="center">
        <TextField
          label="Comentar"
          value={comentario}
          sx={{ width: "100%" }}
          onChange={(event) => setComentario(event.target.value)}
        />
        <Button size="small" sx={{ mx: 2 }} onClick={() => comentar()}>
          Postar
        </Button>
      </Stack>
    </Card>
  ) : (
    <Alert severity="warning">
      Você precisa estar logado para poder comentar.
    </Alert>
  );
};
