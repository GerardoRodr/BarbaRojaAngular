import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from './models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  //private apiUrl = 'https://apibarbaroja.azurewebsites.net/api/v1';
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getServicios() {
    return this.http.get(`${this.apiUrl}/servicios`)
  }

  getServicioById(idServicio: number) {
    return this.http.get(`${this.apiUrl}/servicios/${idServicio}`)
  }

  crearServicio(formData: FormData) {
    return this.http.post(`${this.apiUrl}/servicios/crearConImagen`, formData);
  }

  getCategoriasServicio() {
    return this.http.get(`${this.apiUrl}/categoriaServicios`)
  }

  editarServicio(servicio: Servicio) {
    return this.http.put(`${this.apiUrl}/servicios/${servicio.id}`, servicio);
  }

  eliminarServicio(idServicio: number) {
    return this.http.delete(`${this.apiUrl}/servicios/${idServicio}`)
  }
}