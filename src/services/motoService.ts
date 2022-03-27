import { Moto } from "../models/Moto";
import api from "./api";

export function listarMotos() {
  return api.get<Moto[]>("/moto");
}

export function getMoto(idMoto: number) {
  return api.get(`/moto/${idMoto}`);
}

export function excluirMoto(idMoto: number) {
  return api.delete(`/moto/${idMoto}`);
}
