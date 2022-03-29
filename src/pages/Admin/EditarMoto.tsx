import { Alert, Button, Container, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MotoForm } from "../../components/MotoForm";
import { Moto } from "../../models/Moto";
import {
  adicionarMoto,
  atualizarMoto,
  getMoto,
} from "../../services/motoService";

interface EditarUsuarioPageProps {
  tipo: "add" | "edit";
}

export const EditarMotoPage: React.FC<EditarUsuarioPageProps> = ({ tipo }) => {
  const motoId = parseInt(useParams().motoId as string);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
    if (moto) {
      if (tipo === "add") {
        adicionarMoto(moto)
          .then(({ data }) => {
            if (data.id) {
              enqueueSnackbar("Moto adicionada.", {
                variant: "success",
              });
              setMoto(data);
              navigate(`/admin/motos/edit/${data.id}`);
            }
          })
          .catch(() => {
            enqueueSnackbar("Erro ao adicionar a moto, tente novamente.", {
              variant: "error",
            });
          });
      } else if (tipo === "edit") {
        atualizarMoto(motoId, moto)
          .then(({ data }) => {
            if (data.id) {
              enqueueSnackbar("Moto atualizada.", {
                variant: "success",
              });
              setMoto(data);
            }
          })
          .catch(() => {
            enqueueSnackbar("Erro ao atualizar a moto, tente novamente.", {
              variant: "error",
            });
          });
      }
    }
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
          <Button component={Link} to="/admin/motos">
            Voltar
          </Button>
        </>
      ) : (
        <>
          <Alert severity="error">Selecione um usuário válido.</Alert>
          <Button component={Link} to="/admin/motos" variant="contained">
            Voltar
          </Button>
        </>
      )}
    </Stack>
  );
};
