import { Usuario } from "../models/Usuario";
import api from "./api";

export function adicionarUsuario(usuario: Usuario) {
  return api.post<Usuario>("/usuario", usuario);
}

export function listarUsuarios() {
  return api.get<Usuario[]>("/usuario");
}

export function getUsuario(id: number) {
  return api.get<Usuario>(`/usuario/${id}`);
}

export function atualizarUsuario(id: number, usuario: Usuario) {
  return api.patch<Usuario>(`/usuario/${id}`, usuario);
}

export function excluirUsuario(id: number) {
  return api.delete(`/usuario/${id}`);
}
