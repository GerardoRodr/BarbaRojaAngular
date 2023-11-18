import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://apibarbaroja.azurewebsites.net/api/v1/clientes';

  constructor(private http: HttpClient) { }

  loginCliente(credentials: { correo: string; pass: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginCliente`, credentials);
  }
}
