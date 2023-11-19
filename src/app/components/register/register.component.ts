import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../services/models/cliente.model';
import { RegisterService } from '../../services/register.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  cliente: Cliente = { id: 0, nombreCliente: '', apellidoCliente: '', correo: '', pass: '', telefono: '' };
  loading: boolean = false;

  constructor(private registerService: RegisterService) {}

  registrar() {
    this.loading = true;

    this.registerService.registrarCliente(this.cliente).subscribe(
      (response: any) => {
        this.cliente = response
        console.log(response)
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        console.error(err)
      }
    );
  }
}
