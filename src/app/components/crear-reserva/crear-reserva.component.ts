import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from '../../services/models/servicio.model';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../services/reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})
export class CrearReservaComponent implements OnInit{
  idServicio = 0;
  servicio: Servicio = {
    id: 0,
    nombreServicio: '',
    categoria: {
      id: 0,
      nombreCategoria: ''
    },
    descripcion: '',
    precio: 0,
    rutaImagen: ''
  }
  fechaReserva: string = ""; // Puedes proporcionar una cadena de fecha válida
  horaReserva: string = "";

  constructor(private apiServicio: ServiciosService, private reservaService: ReservasService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idServicio = this.activatedRoute.snapshot.params['id'];

    this.apiServicio.getServicioById(this.idServicio).subscribe((res:any) => {
      this.servicio = res;
    })
  }

  minFecha(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    // Asegúrate de que el mes y el día tengan siempre dos dígitos
    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  
  crearReserva() {

    if (!this.fechaReserva || !this.horaReserva) {
      this.showDialog('warning','Todos los campos deben ser completados.');
      return; // Puedes mostrar un mensaje de error al usuario si lo deseas
    }

    const fechaCompletaString = `${this.fechaReserva}T${this.horaReserva}`;
    const fechaCompleta = new Date(fechaCompletaString)

    if (fechaCompleta < new Date()) {
      Swal.fire({
        title: '<strong class="text-body">La fecha no puede ser anterior a hoy</strong>',
        icon: 'warning',
        html: `
          <p class="text-body-secondary m-0">Por favor ingrese una <b>fecha valida</b></p>
        `,
        background: "#303030",
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
      })
    } else {
      //Se captura la id del usuario desde el navegador
      const userId = Number(localStorage.getItem('userId') || 0);
      //Se hace la peticios post crearReserva
      this.reservaService.crearReserva(userId, this.idServicio, fechaCompleta).subscribe(
        (response: any) => {

          Swal.fire({
            title: `<strong class="text-body">Todo Listo!</strong>`,
            icon: 'success',
            html: `
              <p class="text-body-secondary m-0">Se ha creado la reserva correctamente.</p>
            `,
            background: "#303030",
            buttonsStyling: false,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false,
          }).then( (result) => {
            //SI SE CIERRA LA ALERTA:
            if (result.isDismissed) {
              
            }
          });

          console.log(response)
        },
        (err) => {
          this.showDialog('error',  err.error.mensaje)
        }
      )
    }
  }

  showDialog(tipoIcono: 'error' | 'warning' | 'success', mensaje?: string, titulo?: string): void {
    Swal.fire({
      title: `<strong class="text-body">${titulo || 'Tenemos un problema!'}</strong>`,
      icon: tipoIcono,
      html: `
        <p class="text-body-secondary m-0">${mensaje || ''}</p>
      `,
      background: "#303030",
      buttonsStyling: false,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
    });
  }
}