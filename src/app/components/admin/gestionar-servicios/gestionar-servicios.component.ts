import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../../services/models/servicio.model';
import { ServiciosService } from '../../../services/servicios.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-gestionar-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestionar-servicios.component.html',
  styleUrl: './gestionar-servicios.component.css'
})
export class GestionarServiciosComponent implements OnInit {
  isLogged: Boolean = false;
  isAdmin: Boolean = false;
  servicios: Servicio[] = [];

  constructor(private servicioService: ServiciosService, private router: Router, private userService: UsuariosService) {}

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

    this.servicioService.getServicios().subscribe( (res:any) => {
      this.servicios = res;
    })
  }
}
