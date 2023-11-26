import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'https://apibarbaroja.azurewebsites.net/api/v1/reservas';
  //private apiUrl = 'http://localhost:8080/api/v1/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(usuarioId: number, servicioId: number, fecha: Date): Observable<any> {
    const fechaISO = fecha.toISOString();

    const body = {
      usuario: { id: usuarioId },
      servicio: { id: servicioId },
      fechaReserva: fechaISO  // Convertir la fecha a un formato ISO string
    };

    return this.http.post(`${this.apiUrl}/crear`, body);
  }

  getReservasById(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/${idUsuario}`)
  }

  cancelarReserva(idReserva: number) {
    return this.http.put(`${this.apiUrl}/actualizarEstado/${idReserva}?estado=3`, null)
  }
}