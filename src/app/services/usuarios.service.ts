import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private apiUrl = 'https://apibarbaroja.azurewebsites.net/api/v1/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarioById(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idUsuario}`);
  }

  loginUsuario(credentials: { correo: string; pass: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginUsuario`, credentials);
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}`, usuario)
  }
}