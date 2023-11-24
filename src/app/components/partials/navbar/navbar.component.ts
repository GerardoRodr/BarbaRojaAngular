import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogged: Boolean = false;
  nombreUsuario: string = '';

  constructor(private userService: UsuariosService) {}

  //Verificacion al inicio si es que esta logeado
  ngOnInit() {
    //Solo se ejecutara si el código se está ejecutando en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = Number(localStorage.getItem('userId') || 0);
      this.isLogged = !!userId;

      if (this.isLogged) {
        this.userService.getUsuarioById(userId).subscribe(
          (response: any) => {
            this.nombreUsuario = response.nombreUsuario;
          },
          (err) => {
            this.isLogged = false;
            console.log(err);
          }
        );
      }
    }
  }

  cerrarSesion() {
    Swal.fire({
      title: '<strong class="text-body">¿Estas seguro?</strong>',
      icon: 'warning',
      html: `
        <p class="text-body-secondary m-0">Estas seguro de querer <b>cerrar sesion</b>?</p>
      `,
      background: "#303030",
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
      `
    }).then((result) => {
      if (result.isConfirmed) {
        //Se elimina el id del Usuario del localStorage
        localStorage.removeItem('userId');
        //Se redirige recargando la pagina al inicio
        window.location.assign('/');
      }
    });
  }
}