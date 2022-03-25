import { Usuario } from "../models/Usuario";
import api from "./api";

export function salvarUsuario(usuario: Usuario) {
  return api.post("/usuario", usuario);
}
