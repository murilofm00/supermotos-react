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
import { Categoria } from "../../models/Categoria";
import {
  adicionarCategoria,
  atualizarCategoria,
  excluirCategoria,
  listarCategorias,
} from "../../services/categoriaService";

type Interacao = "edit" | "delete";

export const EditarCategoriasPage: React.FC = ({}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [interacao, setInteracao] = useState<Interacao>();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>();

  function changeInteracao(interacao?: Interacao, categoria?: Categoria) {
    setInteracao(interacao);
    setCategoriaSelecionada(categoria);
    listarCategorias().then(({ data }) => {
      setCategorias(data);
    });
  }

  useEffect(() => {
    listarCategorias().then(({ data }) => {
      setCategorias(data);
    });
  }, []);
  return (
    <Container>
      <Typography variant="h5">Categorias</Typography>
      <AddCategoriaForm
        onAdd={(categoriaAdd) => setCategorias([...categorias, categoriaAdd])}
      />
      <List>
        {categorias.map((categoria) =>
          categoriaSelecionada?.id === categoria.id && interacao ? (
            interacao === "edit" ? (
              <ListItemCategoriaEdit
                key={categoriaSelecionada.id}
                categoria={categoriaSelecionada}
                setCategoria={setCategoriaSelecionada}
                changeInteracao={changeInteracao}
              />
            ) : (
              <ListItemCategoriaDelete
                key={categoriaSelecionada.id}
                categoria={categoriaSelecionada}
                changeInteracao={changeInteracao}
              />
            )
          ) : (
            <ListItem
              key={categoria.id}
              sx={{ background: "#d5d5d5", p: 1.5 }}
              secondaryAction={
                <>
                  <IconButton
                    onClick={() => changeInteracao("edit", categoria)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => changeInteracao("delete", categoria)}
                  >
                    <Delete color="error" />
                  </IconButton>
                </>
              }
            >
              {categoria.descricao}
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
};

interface ListItemCategoriaEditProps {
  categoria: Categoria;
  setCategoria: (categoria: Categoria) => void;
  changeInteracao: (interacao?: Interacao, categoria?: Categoria) => void;
}
const ListItemCategoriaEdit: React.FC<ListItemCategoriaEditProps> = ({
  categoria,
  setCategoria,
  changeInteracao,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  function editCategoria() {
    atualizarCategoria(categoria.id, categoria)
      .then(() => {
        enqueueSnackbar("Categoria atualizada", { variant: "success" });
        changeInteracao();
      })
      .catch(() =>
        enqueueSnackbar(
          "Erro ao atualizar a categoria selecionada, tente novamente.",
          { variant: "error" }
        )
      );
  }

  return (
    <ListItem
      sx={{ background: "#d5d5d5", p: 1.5 }}
      secondaryAction={
        <>
          <IconButton color="primary" onClick={() => editCategoria()}>
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
        value={categoria.descricao}
        onChange={(event) =>
          setCategoria({ ...categoria, descricao: event.target.value })
        }
      />
    </ListItem>
  );
};

interface AddCategoriaFormProps {
  onAdd: (categoria: Categoria) => void;
}
const AddCategoriaForm: React.FC<AddCategoriaFormProps> = ({ onAdd }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [categoria, setCategoria] = useState<Categoria>({
    descricao: "",
  } as Categoria);

  return (
    <>
      <Stack direction={"row"} spacing={2} alignItems="baseline" sx={{ my: 2 }}>
        <Typography>Adicionar:</Typography>
        <TextField
          label="Descrição"
          variant="standard"
          sx={{ flexGrow: 1 }}
          value={categoria.descricao}
          onChange={(event) =>
            setCategoria({ ...categoria, descricao: event.target.value })
          }
        />
        <Button
          variant="contained"
          onClick={() =>
            adicionarCategoria(categoria)
              .then(({ data }) => {
                enqueueSnackbar("Categoria adicionada", { variant: "success" });
                setCategoria({ descricao: "" } as Categoria);
                onAdd(data);
              })
              .catch(() =>
                enqueueSnackbar(
                  "Erro ao adicionar categoria, tente novamente.",
                  { variant: "success" }
                )
              )
          }
        >
          Adicionar
        </Button>
      </Stack>
    </>
  );
};

interface ListItemCategoriaDeleteProps {
  categoria: Categoria;
  changeInteracao: (interacao?: Interacao, categoria?: Categoria) => void;
}
const ListItemCategoriaDelete: React.FC<ListItemCategoriaDeleteProps> = ({
  categoria,
  changeInteracao,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  function deleteCategoria() {
    excluirCategoria(categoria.id)
      .then(() => {
        enqueueSnackbar("Categoria removida", { variant: "success" });
        changeInteracao();
      })
      .catch(() =>
        enqueueSnackbar(
          "Erro ao remover a categoria, verifique se ela não está vinculada a nenhuma moto e tente novamente.",
          { variant: "error" }
        )
      );
  }

  return (
    <ListItem
      sx={{ background: "#d5d5d5", p: 1.5 }}
      secondaryAction={
        <>
          <IconButton color="primary" onClick={() => deleteCategoria()}>
            <Check />
          </IconButton>
          <IconButton color="error" onClick={() => changeInteracao()}>
            <Cancel />
          </IconButton>
        </>
      }
    >
      <Typography>
        Deseja remover a categoria: <b>{categoria.descricao}</b> ?
      </Typography>
    </ListItem>
  );
};
