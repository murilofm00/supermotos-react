import { Moto } from "../models/Moto";
import api from "./api";

export function listarMotos() {
  return api.get<Moto[]>("/moto");
}

export function getMoto(idMoto: number) {
  return api.get(`/moto/${idMoto}`);
}

export function adicionarMoto(moto: Moto) {
  return api.post<Moto>(`/moto`, moto);
}

export function atualizarMoto(idMoto: number, moto: Moto) {
  return api.patch(`/moto/${idMoto}`, moto);
}

export function excluirMoto(idMoto: number) {
  return api.delete(`/moto/${idMoto}`);
}
