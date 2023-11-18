import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { correo: '', pass: '' };
  errorMessage: string = '';
  successMessage: string = '';
  cliente: any;
  loading: boolean = false;

  constructor(private loginService: LoginService) {}

  login() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.loginService.loginCliente(this.credentials).subscribe(
      (response: any) => {
        this.successMessage = response.mensaje;
        this.cliente = response.cliente;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        if (error.status === 401) {
          console.log(error.error);
          this.errorMessage = error.error.mensajeError;
        } else {
          this.errorMessage = 'Error en el inicio de sesión.';
        }
      }
    );
  }
}
