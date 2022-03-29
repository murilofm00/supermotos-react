import { Marca } from "../models/Marca";
import api from "./api";

export function listarMarcas() {
  return api.get<Marca[]>("/marca");
}

export function getMarca(idMarca: number) {
  return api.get(`/marca/${idMarca}`);
}

export function adicionarMarca(marca: Marca) {
  return api.post<Marca>(`/marca`, marca);
}

export function atualizarMarca(idMarca: number, marca: Marca) {
  return api.patch<Marca>(`/marca/${idMarca}`, marca);
}

export function excluirMarca(idMarca: number) {
  return api.delete(`/marca/${idMarca}`);
}
