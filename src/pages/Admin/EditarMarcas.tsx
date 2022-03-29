import { Cancel, Check, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Marca } from "../../models/Marca";
// import { Marca } from "../../models/Marca";
import {
  adicionarMarca,
  atualizarMarca,
  excluirMarca,
  listarMarcas,
} from "../../services/marcaService";

type Interacao = "edit" | "delete";

export const EditarMarcasPage: React.FC = ({}) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [interacao, setInteracao] = useState<Interacao>();
  const [marcaSelecionada, setMarcaSelecionada] = useState<Marca>();

  function changeInteracao(interacao?: Interacao, marca?: Marca) {
    setInteracao(interacao);
    setMarcaSelecionada(marca);
    listarMarcas().then(({ data }) => {
      setMarcas(data);
    });
  }

  useEffect(() => {
    listarMarcas().then(({ data }) => {
      setMarcas(data);
    });
  }, []);
  return (
    <Container>
      <Typography variant="h5">Marcas</Typography>
      <AddMarcaForm onAdd={(marcaAdd) => setMarcas([...marcas, marcaAdd])} />
      <List>
        {marcas.map((marca) =>
          marcaSelecionada?.id === marca.id && interacao ? (
            interacao === "edit" ? (
              <ListItemMarcaEdit
                key={marcaSelecionada.id}
                marca={marcaSelecionada}
                setMarca={setMarcaSelecionada}
                changeInteracao={changeInteracao}
              />
            ) : (
              <ListItemMarcaDelete
                key={marcaSelecionada.id}
                marca={marcaSelecionada}
                changeInteracao={changeInteracao}
              />
            )
          ) : (
            <ListItem
              key={marca.id}
              sx={{ background: "#d5d5d5", p: 1.5 }}
              secondaryAction={
                <>
                  <IconButton onClick={() => changeInteracao("edit", marca)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => changeInteracao("delete", marca)}>
                    <Delete color="error" />
                  </IconButton>
                </>
              }
            >
              {marca.descricao}
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
};

interface ListItemMarcaEditProps {
  marca: Marca;
  setMarca: (marca: Marca) => void;
  changeInteracao: (interacao?: Interacao, marca?: Marca) => void;
}
const ListItemMarcaEdit: React.FC<ListItemMarcaEditProps> = ({
  marca,
  setMarca,
  changeInteracao,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  function editMarca() {
    atualizarMarca(marca.id, marca)
      .then(() => {
        enqueueSnackbar("Marca atualizada", { variant: "success" });
        changeInteracao();
      })
      .catch(() =>
        enqueueSnackbar(
          "Erro ao atualizar a marca selecionada, tente novamente.",
          { variant: "error" }
        )
      );
  }

  return (
    <ListItem
      sx={{ background: "#d5d5d5", p: 1.5 }}
      secondaryAction={
        <>
          <IconButton color="primary" onClick={() => editMarca()}>
            <Check />
          </IconButton>
          <IconButton color="error" onClick={() => changeInteracao()}>
            <Cancel />
          </IconButton>
        </>
      }
    >
      <TextField
        label="Descrição"
        variant="standard"
        sx={{ flexGrow: 1 }}
        fullWidth
        value={marca.descricao}
        onChange={(event) =>
          setMarca({ ...marca, descricao: event.target.value })
        }
      />
    </ListItem>
  );
};

interface AddMarcaFormProps {
  onAdd: (marca: Marca) => void;
}
const AddMarcaForm: React.FC<AddMarcaFormProps> = ({ onAdd }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [marca, setMarca] = useState<Marca>({
    descricao: "",
  } as Marca);

  return (
    <>
      <Stack direction={"row"} spacing={2} alignItems="baseline" sx={{ my: 2 }}>
        <Typography>Adicionar:</Typography>
        <TextField
          label="Descrição"
          variant="standard"
          sx={{ flexGrow: 1 }}
          value={marca.descricao}
          onChange={(event) =>
            setMarca({ ...marca, descricao: event.target.value })
          }
        />
        <Button
          variant="contained"
          onClick={() =>
            adicionarMarca(marca)
              .then(({ data }) => {
                enqueueSnackbar("Marca adicionada", { variant: "success" });
                setMarca({ descricao: "" } as Marca);
                onAdd(data);
              })
              .catch(() =>
                enqueueSnackbar("Erro ao adicionar marca, tente novamente.", {
                  variant: "success",
                })
              )
          }
        >
          Adicionar
        </Button>
      </Stack>
    </>
  );
};

interface ListItemMarcaDeleteProps {
  marca: Marca;
  changeInteracao: (interacao?: Interacao, marca?: Marca) => void;
}
const ListItemMarcaDelete: React.FC<ListItemMarcaDeleteProps> = ({
  marca,
  changeInteracao,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  function deleteMarca() {
    excluirMarca(marca.id)
      .then(() => {
        enqueueSnackbar("Marca removida", { variant: "success" });
        changeInteracao();
      })
      .catch(() =>
        enqueueSnackbar(
          "Erro ao remover a marca, verifique se ela não está vinculada a nenhuma moto e tente novamente.",
          { variant: "error" }
        )
      );
  }

  return (
    <ListItem
      sx={{ background: "#d5d5d5", p: 1.5 }}
      secondaryAction={
        <>
          <IconButton color="primary" onClick={() => deleteMarca()}>
            <Check />
          </IconButton>
          <IconButton color="error" onClick={() => changeInteracao()}>
            <Cancel />
          </IconButton>
        </>
      }
    >
      <Typography>
        Deseja remover a marca: <b>{marca.descricao}</b> ?
      </Typography>
    </ListItem>
  );
};
