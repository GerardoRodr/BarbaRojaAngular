import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosService } from '../../../../services/servicios.service';
import { Categoria } from '../../../../services/models/categoria.model';

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-servicio.component.html',
  styleUrl: './editar-servicio.component.css'
})
export class EditarServicioComponent implements OnInit{

  categorias: Categoria[] = []

  constructor(private servService: ServiciosService) {}

  ngOnInit(): void {
    this.servService.getCategoriasServicio().subscribe( (res:any) => {
      this.categorias = res;
    });
  }

}
