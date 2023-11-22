import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../services/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    correo: '',
    pass: '',
    telefono: '',
    admin: false,
  };

  loading: boolean = false;

  constructor(private usertService: UsuariosService) {}

  //Validacion nombre
  nombreError: string = '';
  validarNombre() {
    const nombrePattern = /^[a-zA-Z\s]{1,25}$/;

    if (!this.usuario.nombreUsuario) {
      this.nombreError = 'El nombre es requerido.';
    } else if (!nombrePattern.test(this.usuario.nombreUsuario)) {
      this.nombreError =
        'Ingrese un nombre válido (máximo 25 caracteres y solo letras y espacios).';
    } else {
      this.nombreError = '';
    }
  }

  //Validacion apellido
  apellidoError: String = '';
  validarApellido() {
    const apellidoPattern = /^[a-zA-Z\s]{1,25}$/;

    if (!this.usuario.apellidoUsuario) {
      this.apellidoError = 'El apellido es requerido.';
    } else if (!apellidoPattern.test(this.usuario.apellidoUsuario)) {
      this.apellidoError =
        'Ingrese un apellido válido (máximo 25 caracteres y solo letras y espacios).';
    } else {
      this.apellidoError = '';
    }
  }

  //Validacion correo
  correoError: string = '';
  validarCorreo() {
    const correoPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.usuario.correo) {
      this.correoError = 'El correo electrónico es requerido.';
    } else if (!correoPattern.test(this.usuario.correo)) {
      this.correoError = 'Por favor, ingrese un correo electrónico válido.';
    } else {
      this.correoError = '';
    }
  }

  //Validacion contraseña
  passError: string = '';
  validarPassword() {
    const passLength = this.usuario.pass.length;

    if (passLength < 9 || passLength > 15) {
      this.passError = 'La contraseña debe tener entre 9 y 15 caracteres.';
    } else {
      this.passError = '';
    }
  }

  //Validacion numero telefonico
  telefonoError: string = '';
  validarTelefono() {
    const telefonoPattern = /^[0-9]{9}$/;

    if (!this.usuario.telefono) {
      this.telefonoError = 'El número telefónico es requerido.';
    } else if (!telefonoPattern.test(this.usuario.telefono)) {
      this.telefonoError = 'Ingrese un número telefónico válido de 9 dígitos.';
    } else {
      this.telefonoError = '';
    }
  }

  camposVacios: String = '';
  registrar() {
    // Verificar si todos los campos requeridos están llenos
    if (
      this.usuario.nombreUsuario &&
      this.usuario.apellidoUsuario &&
      this.usuario.correo &&
      this.usuario.pass &&
      this.usuario.telefono
    ) {
      this.loading = true;

      this.usertService.registrarUsuario(this.usuario).subscribe(
        (response: any) => {
          this.usuario = response;
          console.log(response);
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.error(err);
        }
      );
    } else {
      // Campos vacios
      this.camposVacios = 'Completa los campos requeridos';
    }
  }
}
