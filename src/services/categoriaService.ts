import { Categoria } from "../models/Categoria";
import api from "./api";

export function listarCategorias() {
  return api.get<Categoria[]>("/categoria");
}

export function atualizarCategoria(id: number, categoria: Categoria) {
  return api.patch<Categoria>(`/categoria/${id}`, categoria);
}

export function adicionarCategoria(categoria: Categoria) {
  return api.post<Categoria>("/categoria", categoria);
}

export function excluirCategoria(id: number) {
  return api.delete<Categoria>(`/categoria/${id}`);
}
