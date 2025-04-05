import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private apiUrl = 'https://christian-binny-gerardorod-e1204fc0.koyeb.app/api/v1/reservas';
  //private apiUrl = 'http://localhost:8080/api/v1/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(
    usuarioId: number,
    servicioId: number,
    fecha: string
  ): Observable<any> {

    const body = {
      usuario: { id: usuarioId },
      servicio: { id: servicioId },
      fechaReserva: fecha, // Convertir la fecha a un formato ISO string
    };

    return this.http.post(`${this.apiUrl}/crear`, body);
  }

  getReservasById(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/${idUsuario}`);
  }

  getReservasProximas() : Observable<any> {
    return this.http.get(`${this.apiUrl}/reservasProximas`);
  }

  cancelarReserva(idReserva: number) {
    return this.http.put(
      `${this.apiUrl}/actualizarEstado/${idReserva}?estado=3`,
      null
    );
  }

  /* 
    estado 1 es "PENDIENTE",
    estado 2 es "FINALIZADA",
    estado 3 es "CANCELADA"
  */
  modificarEstadoReserva(idReserva: number, estado: number) {
    return this.http.put(
      `${this.apiUrl}/actualizarEstado/${idReserva}?estado=${estado}`,
      null
    );
  }

  //ADMINSERVICES
  getReservas() {
    return this.http.get(`${this.apiUrl}`);
  }
}
