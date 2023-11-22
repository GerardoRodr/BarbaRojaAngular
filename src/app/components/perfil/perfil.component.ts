import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../services/models/usuario.model';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  isEditable: Boolean = false;
  loading: Boolean = false;

  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    correo: '',
    pass: '',
    telefono: '',
    admin: false,
  };

  constructor(private userService: UsuariosService ) {}

  ngOnInit(): void {
     if (typeof window !== 'undefined' && window.localStorage) {
      const userId = Number(localStorage.getItem('userId') || 0);

        this.userService.getUsuarioById(userId).subscribe(
          (response: any) => {
            this.usuario = response;
            console.log(response);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  changeEditable() {
    if (this.isEditable) {
      this.isEditable = false
    } else {
      this.isEditable = true
    }
  }

  editarUsuario() {
    this.isEditable = false;
    
    if (
      this.usuario.nombreUsuario &&
      this.usuario.apellidoUsuario &&
      this.usuario.correo &&
      this.usuario.pass &&
      this.usuario.telefono
    ) {
      this.loading = true;

      this.userService.editarUsuario(this.usuario.id, this.usuario).subscribe(
        (response: any) => {
          this.usuario = response;
        },
        (err) => {
          this.loading = false;
          console.error(err)
        }
      )
    }
  }
}
