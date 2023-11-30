import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../../services/models/servicio.model';
import { ServiciosService } from '../../../services/servicios.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicios-destacados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servicios-destacados.component.html',
  styleUrl: './servicios-destacados.component.css'
})
export class ServiciosDestacadosComponent implements OnInit{

  serviciosDestacados: any;

  constructor(private apiServicio: ServiciosService, private router: Router) {}

  ngOnInit(): void {
    this.apiServicio.getServiciosDestacados().subscribe((res:any) => {
      this.serviciosDestacados = res.slice(0, 4);
    });
  }

  reservarServicioDestacado(id: any): void {
    this.router.navigate(['/reservar', id]);
  }

}