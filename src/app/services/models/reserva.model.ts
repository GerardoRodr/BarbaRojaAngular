import { Servicio } from "./servicio.model";
import { Usuario } from "./usuario.model";

export interface Reserva {
    id: number;
    usuario: Usuario;
    servicio: Servicio;
    fechaReserva: Date;
    fechaCreacion: Date;
    estado: 'PENDIENTE' | 'FINALIZADA' | 'CANCELADA';
}