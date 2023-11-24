import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from '../../services/models/servicio.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})

export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private apiServicio: ServiciosService) {}
  
  ngOnInit(): void {
    this.apiServicio.getServicios().subscribe((res:any) => {
      this.servicios = res;
    })
  }
}