import { BaseModel } from "./BaseModel";
import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

export interface Moto extends BaseModel {
  nome: string;
  descricao: string;
  potencia: number;
  imagem: string;
  idCategoria: number;
  idMarca: number;
  categoria: Categoria;
  marca: Marca;
}
