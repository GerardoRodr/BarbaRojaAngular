import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../services/models/usuario.model';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gestionar-usuarios.component.html',
  styleUrl: './gestionar-usuarios.component.css',
})
export class GestionarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  idUsuarioActual = 0;

  constructor(private userService: UsuariosService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.idUsuarioActual = Number(localStorage.getItem('userId') || 0);
    }
    this.userService.getUsuarios().subscribe((res: any) => {
      this.usuarios = res;
    });
  }

  isAdminValidator(isAdmin: boolean): string {
    if (isAdmin) {
      return 'Si';
    } else {
      return 'No';
    }
  }

  eliminarUsuario(idUsuario: number, nombreUsuario: string) {
    if (idUsuario === this.idUsuarioActual) {
      Swal.fire({
        title: `<strong class="text-body">Por motivos de seguridad no puedes eliminar tu propio usuario.</strong>`,
        icon: 'warning',
        background: '#303030',
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
      });
    } else {
      Swal.fire({
        title: `<strong class="text-body">¿Quieres eliminar el usuario ${nombreUsuario}?</strong>`,
        icon: 'warning',
        html: `
          <p class="text-body-secondary m-0"><b>Eliminar el usuario ${nombreUsuario}</b> es una accion <b>irreversible!</b></p>
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
            .eliminarUsuario(idUsuario)
            .subscribe(null, null, () => {
              Swal.fire({
                title: `<strong class="text-body">Se ha eliminado el usuario ${nombreUsuario} correctamente.</strong>`,
                icon: 'warning',
                background: '#303030',
                buttonsStyling: false,
                showCloseButton: true,
                showConfirmButton: false,
                focusConfirm: false,
              }).then((result) => {
                if (result.isDismissed) {
                  window.location.assign('/gestionarUsuarios');
                }
              });
            });
        }
      });
    }
  }
}