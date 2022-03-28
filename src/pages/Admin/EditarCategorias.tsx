import { Cancel, Check, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Categoria } from "../../models/Categoria";
import { listarCategorias } from "../../services/categoriaService";

type Interacao = "add" | "edit" | "delete";

export const EditarCategoriasPage: React.FC = ({}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [interacao, setInteracao] = useState<Interacao>();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>();

  function atualizarCategoria() {}

  function changeInteracao(interacao?: Interacao, categoria?: Categoria) {
    setInteracao(interacao);
    setCategoriaSelecionada(categoria);
  }

  useEffect(() => {
    listarCategorias().then(({ data }) => {
      setCategorias(data);
    });
  }, []);
  return (
    <Container>
      <Typography variant="h5">Categorias</Typography>
      <Stack direction={"row"} spacing={2} alignItems="baseline" sx={{ my: 2 }}>
        <Typography>Adicionar:</Typography>
        <TextField label="Descrição" variant="standard" sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={}>
          Adicionar
        </Button>
      </Stack>
      <List>
        {categorias.map((categoria) =>
          categoriaSelecionada?.id === categoria.id && interacao === "edit" ? (
            <ListItemCategoriaEdit categoria={categoriaSelecionada} />
          ) : (
            <ListItem
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
  changeInteracao: (interacao?: Interacao, categoria?: Categoria) => void;
}
export const ListItemCategoriaEdit: React.FC<ListItemCategoriaEditProps> = ({
  categoria,
  changeInteracao,
}) => {
  return (
    <ListItem
      sx={{ background: "#d5d5d5", p: 1.5 }}
      secondaryAction={
        <>
          <IconButton color="primary">
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
      />
    </ListItem>
  );
};
