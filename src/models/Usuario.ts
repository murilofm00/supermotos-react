import { BaseModel } from "./BaseModel";
import { Comentario } from "./Comentario";

export class Usuario extends BaseModel {
  nome!: string;
  email!: string;
  isAdmin!: boolean;
  comentarios?: Comentario[];
}
