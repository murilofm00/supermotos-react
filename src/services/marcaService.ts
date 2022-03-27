import { Marca } from "../models/Marca";
import api from "./api";

export function listarMarcas() {
  return api.get<Marca[]>("/marca");
}
