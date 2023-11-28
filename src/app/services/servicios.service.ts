import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'https://apibarbaroja.azurewebsites.net/api/v1';
  //private apiUrl = 'http://localhost:8080/api/v1';

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
}
