import { Comentario } from "../models/Comentario";
import api from "./api";

export function adicionarComentario(comentario: Comentario) {
  return api.post<Comentario>("/comentario", comentario);
}
