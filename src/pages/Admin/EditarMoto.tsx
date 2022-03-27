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
import { Moto } from "../../models/Moto";
import { MotoForm } from "../../components/MotoForm";
import { getMoto } from "../../services/motoService";

interface EditarUsuarioPageProps {
  tipo: "add" | "edit";
}

export const EditarMotoPage: React.FC<EditarUsuarioPageProps> = ({ tipo }) => {
  const motoId = parseInt(useParams().motoId as string);
  const { enqueueSnackbar } = useSnackbar();

  const [moto, setMoto] = useState<Moto>(
    (): Moto =>
      ({
        nome: "",
        descricao: "",
        ano: new Date().getFullYear(),
        imagem: "",
        potencia: 0,
        idMarca: 0,
        idCategoria: 0,
      } as Moto)
  );

  useEffect(() => {
    if (tipo === "edit") {
      if (motoId && !isNaN(motoId))
        getMoto(motoId).then(({ data }) => setMoto(data));
    }
  }, []);

  function salvar() {
    // if (moto) {
    //   if (tipo === "add") {
    //     adicionarUsuario(moto)
    //       .then(({ data }) => {
    //         if (data.id) {
    //           enqueueSnackbar("Usuario adicionado.", {
    //             variant: "success",
    //           });
    //           setMoto(data);
    //         }
    //       })
    //       .catch(() => {
    //         enqueueSnackbar("Erro ao adicionar o usuario, tente novamente.", {
    //           variant: "error",
    //         });
    //       });
    //   } else if (tipo === "edit") {
    //     atualizarUsuario(motoId, usuario)
    //       .then(({ data }) => {
    //         if (data.id) {
    //           enqueueSnackbar("Usuario atualizado.", {
    //             variant: "success",
    //           });
    //           setMoto(data);
    //         }
    //       })
    //       .catch(() => {
    //         enqueueSnackbar("Erro ao atualizar o usuario, tente novamente.", {
    //           variant: "error",
    //         });
    //       });
    //   }
    // }
  }

  return (
    <Stack spacing={3} component={Container}>
      <Typography variant="h4">
        {tipo === "add" ? "Adicionar" : "Editar"} Moto
      </Typography>
      {moto || tipo === "add" ? (
        <>
          <MotoForm moto={moto} setMoto={setMoto} />
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
