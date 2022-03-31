import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { Moto } from "../../models/Moto";
import { excluirMoto, listarMotos } from "../../services/motoService";

export const EditarMotosPage: React.FC = ({}) => {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [selectedMoto, setSelectedMoto] = useState<Moto>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    listarMotos().then((result) => {
      setMotos(result.data);
    });
  }, []);

  function abrirModalDelete(moto: Moto) {
    setSelectedMoto(moto);
    setDialogOpen(true);
  }

  function onCloseModal(agreed: boolean) {
    if (agreed) {
      if (selectedMoto)
        excluirMoto(selectedMoto?.id).then(() => {
          closeModal();
          enqueueSnackbar("Moto excluida.", {
            variant: "success",
          });
          listarMotos().then((result) => {
            setMotos(result.data);
          });
        });
    } else {
      closeModal();
    }
  }

  function closeModal() {
    setDialogOpen(false);
    setSelectedMoto(undefined);
  }

  return (
    <Container>
      <Typography variant="h5">Motos</Typography>
      <Button
        variant="contained"
        sx={{ my: 2 }}
        startIcon={<AddCircleOutline />}
        onClick={() => navigate("add")}
      >
        Adicionar
      </Button>
      <List>
        {motos.map((moto) => {
          return (
            <ListItem
              key={moto.id}
              sx={{ background: "#d5d5d5", p: 1.5 }}
              dense
              secondaryAction={
                <>
                  <IconButton
                    onClick={() => navigate(`/admin/motos/edit/${moto.id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => abrirModalDelete(moto)}>
                    <Delete color="error" />
                  </IconButton>
                </>
              }
            >
              <Typography>
                {moto.marca?.descricao} - {moto.nome}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      <ConfirmDialog
        open={dialogOpen}
        title={`Remover ${selectedMoto?.nome}`}
        text={`Deseja remover a seguinte moto: ${selectedMoto?.marca?.descricao} - ${selectedMoto?.nome}`}
        onCloseModal={onCloseModal}
      />
    </Container>
  );
};
