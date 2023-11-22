import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/api/v1/clientes';

  constructor(private http: HttpClient) {}

  registrarCliente(cliente: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cliente)
  }
}
