import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:8080/api/v1/clientes';

  constructor(private http: HttpClient) { }

  getClienteById(idCliente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idCliente}`);
  }
}
