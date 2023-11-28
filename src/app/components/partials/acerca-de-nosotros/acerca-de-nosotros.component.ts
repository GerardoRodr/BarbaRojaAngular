import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosService } from '../../../services/servicios.service';
import { Servicio } from '../../../services/models/servicio.model';

@Component({
  selector: 'app-acerca-de-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrl: './acerca-de-nosotros.component.css'
})
export class AcercaDeNosotrosComponent implements OnInit{

  servicios: Servicio[] = [];
  serviciosDestacados: Servicio[] = [];
  

  constructor(private servService: ServiciosService) {}

  ngOnInit(): void {
    this.servService.getServicios().subscribe((res:any) => {
      this.servicios = res;
    }, null, () => {
      this.serviciosDestacados = this.servicios.slice(0, 3);
    })
  }
}
