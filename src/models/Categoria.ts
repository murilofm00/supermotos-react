import { BaseModel } from "./BaseModel";
import { Moto } from "./Moto";

export interface Categoria extends BaseModel {
  descricao: string;
  motos?: Moto[];
}
