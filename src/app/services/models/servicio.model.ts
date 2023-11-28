import { Categoria } from "./categoria.model";

export interface Servicio {
  id: number;
  nombreServicio: string;
  descripcion: string;
  precio: number;
  rutaImagen: string;
  categoria: Categoria;
}