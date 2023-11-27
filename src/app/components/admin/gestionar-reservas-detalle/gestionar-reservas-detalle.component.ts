import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { ReservasService } from '../../../services/reservas.service';
import Swal from 'sweetalert2';
import { Reserva } from '../../../services/models/reserva.model';

@Component({
  selector: 'app-gestionar-reservas-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestionar-reservas-detalle.component.html',
  styleUrl: './gestionar-reservas-detalle.component.css'
})
export class GestionarReservasDetalleComponent {
  isLogged: Boolean = false;
  isAdmin: Boolean = false;
  reservas: Reserva[] = [];

  constructor(private userService: UsuariosService, private router: Router, private reservasService: ReservasService) {}

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

    this.reservasService.getReservas().subscribe( (res:any) => {
      this.reservas = res;
    })
  }

  modificarEstado(idReserva: number, estado: number) {
    Swal.fire({
      title: `<strong class="text-body">Genial!</strong>`,
      icon: 'success',
      html: `
        <p class="text-body-secondary m-0">Se ha modificado correctamente el estado.</p>
      `,
      background: '#303030',
      buttonsStyling: false,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
    }).then((result) => {
      if(result.isDismissed) {
        this.reservasService.modificarEstadoReserva(idReserva, estado).subscribe( (res:any) => {
        })
        Swal.fire({
          title: '<strong class="text-body">Se recargara la pagina para que pueda ver los cambios</strong>',
          icon: 'warning',
          background: "#303030",
          showCloseButton: true,
          showConfirmButton: false,
          showCancelButton: false,
          focusConfirm: false
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
          }
        });
      }
    })
  }
}
