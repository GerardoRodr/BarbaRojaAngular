import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../../services/models/servicio.model';
import { ServiciosService } from '../../../services/servicios.service';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gestionar-servicios.component.html',
  styleUrl: './gestionar-servicios.component.css',
})
export class GestionarServiciosComponent implements OnInit {
  isLogged: Boolean = false;
  isAdmin: Boolean = false;
  servicios: Servicio[] = [];

  constructor(
    private servicioService: ServiciosService,
    private router: Router,
    private userService: UsuariosService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = Number(localStorage.getItem('userId') || 0);
      this.isLogged = !!userId;

      if (this.isLogged) {
        this.userService.getUsuarioById(userId).subscribe(
          (response: any) => {
            this.isAdmin = response.admin;
            if (!this.isAdmin) {
              this.router.navigate(['/']);
            }
          },
          (err) => {
            this.isLogged = false;
            console.log(err);
          }
        );
      }
    }

    this.servicioService.getServicios().subscribe((res: any) => {
      this.servicios = res;
    });
  }

  eliminarServicio(idServicio: number, nombreServicio: string) {
    Swal.fire({
      title: `<strong class="text-body">¿Quieres eliminar el servicio ${nombreServicio}?</strong>`,
      icon: 'warning',
      html: `
        <p class="text-body-secondary m-0"><b>Eliminar el servicio ${nombreServicio}</b> es una accion <b>irreversible!</b></p>
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
        this.servicioService.eliminarServicio(idServicio).subscribe(null, null, () => {
          Swal.fire({
            title: `<strong class="text-body">Se ha eliminado el servicio ${nombreServicio} correctamente.</strong>`,
            icon: 'warning',
            background: '#303030',
            buttonsStyling: false,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false,
          }).then( (result) => {
            if (result.isDismissed) {
              window.location.assign('/gestionarServicios')
            }
          })
        });
      }
    });
  }
}
