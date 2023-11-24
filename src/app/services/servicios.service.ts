import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'https://apibarbaroja.azurewebsites.net/api/v1';

  constructor(private http: HttpClient) { }

  getServicios() {
    return this.http.get(`${this.apiUrl}/servicios`)
  }

  getServicioById(idServicio: number) {
    return this.http.get(`${this.apiUrl}/servicios/${idServicio}`)
  }
}
