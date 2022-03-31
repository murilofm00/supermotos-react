import { Sobre } from "../models/Sobre";
import api from "./api";

export function getSobre() {
  return api.get<Sobre>("/sobre");
}

export function atualizarSobre(sobre: Sobre) {
  return api.patch<Sobre>("/sobre");
}
