import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../services/models/usuario.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
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

  constructor(private userService: UsuariosService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = Number(localStorage.getItem('userId') || 0);

      this.userService.getUsuarioById(userId).subscribe((response: any) => {
        this.usuario = response;
      });
    }
  }

  changeEditable() {
    if (this.isEditable) {
      this.isEditable = false;
    } else {
      this.isEditable = true;
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
      Swal.fire({
        title: `<strong class="text-body">Se ha editado con exito tu usuario</strong>`,
        icon: 'success',
        background: '#303030',
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
      }).then((response) => {
        if (response.isDismissed) {
          this.loading = false;
          this.userService
            .editarUsuario(this.usuario.id, this.usuario)
            .subscribe(
              (response: any) => {
                this.usuario = response;
              }
            );
        }
      });
    }
  }

  eliminarCuenta() {
    Swal.fire({
      title: `<strong class="text-body">¿Quieres eliminar tu cuenta?</strong>`,
      icon: 'warning',
      html: `
        <p class="text-body-secondary m-0"><b>Eliminar tu cuenta es una accion <b>irreversible!</b></p>
      `,
      background: '#303030',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success m-1',
        cancelButton: 'btn btn-danger m-1',
      },
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="bi bi-check"></i> Si
      `,
      cancelButtonText: `
        <i class="bi bi-x"></i> No
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .eliminarUsuario(this.usuario.id)
          .subscribe(null, null, () => {
            Swal.fire({
              title: `<strong class="text-body">Nos apena mucho decirte adios. Esperamos volver a verte</strong>`,
              icon: 'warning',
              background: '#303030',
              buttonsStyling: false,
              showCloseButton: true,
              showConfirmButton: false,
              focusConfirm: false,
            }).then((result) => {
              if (result.isDismissed) {
                window.location.assign('/');
              }
            });
          });
      }
    });
  }
}
