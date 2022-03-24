import { BaseModel } from "./BaseModel";
import { Moto } from "./Moto";

export interface Marca extends BaseModel {
  descricao: string;
  motos?: Moto[];
}
