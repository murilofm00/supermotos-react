import { Categoria } from "../models/Categoria";
import api from "./api";

export function listarCategorias() {
  return api.get<Categoria[]>("/categoria");
}
