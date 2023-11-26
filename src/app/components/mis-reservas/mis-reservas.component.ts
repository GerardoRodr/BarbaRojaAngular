import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../services/reservas.service';
import { Reserva } from '../../services/models/reserva.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})

export class MisReservasComponent implements OnInit{
  userId: number = 0
  reservas: Reserva[] = [];

  constructor (private reservaService: ReservasService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = Number(localStorage.getItem('userId') || 0);
      this.reservaService.getReservasById(this.userId).subscribe((res:any) => {
        this.reservas = res;
      })
    }
  }
  
  cancelarReserva(idReserva: number) {
    Swal.fire({
      title: '<strong class="text-body">¿Estas segur@ de querer cancelar esta reserva?</strong>',
      icon: 'warning',
      html: `
        <p class="text-body-secondary m-0">Esta accion sera <b>imposible de revertir!</b></p>
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
        this.reservaService.cancelarReserva(idReserva).subscribe( (res:any) => {
        })
        Swal.fire({
          title: '<strong class="text-body">Se cancelo la reserva</strong>',
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
    });
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
