import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], //SOLO HTML / COMPONENTES
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent { // LA LOGICA DEL COMPONENTE
  credentials = 
  { 
    correo: '', 
    pass: '' 
  };
  
  errorMessage: string = '';
  successMessage: string = '';
  usuario: any;
  loading: boolean = false;

  constructor(private userService: UsuariosService) {}

  login() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.loginUsuario(this.credentials).subscribe(
      (response: any) => {
        this.successMessage = response.mensaje;
        this.usuario = response.usuario;
        this.loading = false;
        //Se guarda el id en el localStorage
        localStorage.setItem('userId', this.usuario.id)
        //Se redirige recargando la pagina al inicio
        window.location.assign('/');
      },
      (siFalla) => {
        this.loading = false;
        if (siFalla.status === 401) {
          console.log(siFalla.error);
          this.errorMessage = siFalla.error.mensajeError;
        } else {
          this.errorMessage = 'Error en el inicio de sesión';
        }
      }
    );
  }
}