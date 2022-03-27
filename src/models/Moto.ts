import { BaseModel } from "./BaseModel";
import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

export class Moto extends BaseModel {
  nome!: string;
  ano!: number;
  descricao!: string;
  potencia!: number;
  imagem!: string;
  idCategoria!: number;
  idMarca!: number;
  categoria?: Categoria;
  marca?: Marca;
}
