import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { Reserva } from '../../../services/models/reserva.model';
import { ReservasService } from '../../../services/reservas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-gestionar-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gestionar-reservas.component.html',
  styleUrl: './gestionar-reservas.component.css',
})
export class GestionarReservasComponent implements OnInit {
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

    this.reservasService.getReservasProximas().subscribe( (res:any) => {
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

  formatearFecha(inputDate: Date | string): string {
    // Si inputDate es una cadena, convertirla a un objeto Date
    const fecha: Date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;
  
    // Obtener día, mes y año
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const año: number = fecha.getFullYear();
  
    // Añadir ceros a la izquierda si es necesario
    const diaStr: string = dia < 10 ? `0${dia}` : `${dia}`;
    const mesStr: string = mes < 10 ? `0${mes}` : `${mes}`;
  
    // Formatear la fecha en el formato deseado
    const fechaFormateada: string = `${diaStr}/${mesStr}/${año}`;
  
    return fechaFormateada;
  }

  formatearHora(inputDate: Date | string): string {
    // Si inputDate es una cadena, convertirla a un objeto Date
    const fecha: Date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;
  
    // Utilizar toLocaleTimeString para formatear la hora
    const horaFormateada: string = fecha.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
    return horaFormateada;
  }
}
