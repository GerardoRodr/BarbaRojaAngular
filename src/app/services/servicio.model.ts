export interface Servicio {
    id: number;
    nombreServicio: string;
    descripcion: string;
    precio: number;
    rutaImagen: string;
    categoria: {
      id: number;
      nombreCategoria: string;
    };
  }