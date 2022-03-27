import { Image } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Categoria } from "../models/Categoria";
import { Marca } from "../models/Marca";
import { Moto } from "../models/Moto";
import { Usuario } from "../models/Usuario";
import { listarCategorias } from "../services/categoriaService";
import { listarMarcas } from "../services/marcaService";

interface UsuarioFormProps {
  moto: Moto;
  setMoto: (moto: Moto) => void;
}
export const MotoForm: React.FC<UsuarioFormProps> = ({ moto, setMoto }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    listarCategorias().then(({ data }) => setCategorias(data));
    listarMarcas().then(({ data }) => setMarcas(data));
  }, []);

  function atualizarUsuario(param: string, value: any) {
    const motoUpdated: Moto = { ...moto, [param]: value };
    setMoto(motoUpdated);
  }

  return (
    <>
      <TextField
        label="Nome"
        variant="outlined"
        type="text"
        value={moto.nome}
        onChange={(event) => atualizarUsuario("nome", event.target.value)}
      />
      <TextField
        label="Descrição"
        variant="outlined"
        type="text"
        value={moto.descricao}
        onChange={(event) => atualizarUsuario("descricao", event.target.value)}
      />
      <TextField
        label="Ano"
        variant="outlined"
        type="text"
        multiline
        value={moto.ano}
        onChange={(event) => atualizarUsuario("descricao", event.target.value)}
      />
      <FormControl>
        <InputLabel id="categoria-select">Categoria</InputLabel>
        <Select
          id="categoria-select"
          fullWidth
          label="Categoria"
          value={moto.idCategoria}
        >
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>
              {categoria.descricao}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="marca-select">Marca</InputLabel>
        <Select
          id="marca-select"
          fullWidth
          label="Categoria"
          value={moto.idMarca}
        >
          {marcas.map((marca) => (
            <MenuItem key={marca.id} value={marca.id}>
              {marca.descricao}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        component="label"
        color="secondary"
        startIcon={<Image />}
      >
        Imagem
        <input type="file" hidden />
      </Button>
    </>
  );
};
