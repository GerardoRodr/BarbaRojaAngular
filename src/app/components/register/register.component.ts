import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../services/models/cliente.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  cliente: Cliente = {
    id: 0,
    nombreCliente: '',
    apellidoCliente: '',
    correo: '',
    pass: '',
    telefono: '',
  };
  loading: boolean = false;

  constructor(private registerService: RegisterService) {}

  //Validacion nombre
  nombreError: string = '';
  validarNombre() {
    const nombrePattern = /^[a-zA-Z\s]{1,25}$/;

    if (!this.cliente.nombreCliente) {
      this.nombreError = 'El nombre es requerido.';
    } else if (!nombrePattern.test(this.cliente.nombreCliente)) {
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

    if (!this.cliente.apellidoCliente) {
      this.apellidoError = 'El apellido es requerido.';
    } else if (!apellidoPattern.test(this.cliente.apellidoCliente)) {
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

    if (!this.cliente.correo) {
      this.correoError = 'El correo electrónico es requerido.';
    } else if (!correoPattern.test(this.cliente.correo)) {
      this.correoError = 'Por favor, ingrese un correo electrónico válido.';
    } else {
      this.correoError = '';
    }
  }

  //Validacion contraseña
  passError: string = '';
  validarPassword() {
    const passLength = this.cliente.pass.length;

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

    if (!this.cliente.telefono) {
      this.telefonoError = 'El número telefónico es requerido.';
    } else if (!telefonoPattern.test(this.cliente.telefono)) {
      this.telefonoError = 'Ingrese un número telefónico válido de 9 dígitos.';
    } else {
      this.telefonoError = '';
    }
  }

  registrar() {
    this.loading = true;

    this.registerService.registrarCliente(this.cliente).subscribe(
      (response: any) => {
        this.cliente = response;
        console.log(response);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        console.error(err);
      }
    );
  }
}
