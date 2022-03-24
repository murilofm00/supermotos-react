import { BaseModel } from "./BaseModel";
import { Moto } from "./Moto";
import { Usuario } from "./Usuario";

export class Comentario extends BaseModel {
  comentario!: string;
  idMoto!: number;
  idUsuario!: number;
  moto!: Moto;
  usuario!: Usuario;
}
