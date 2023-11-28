import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosService } from '../../../../services/servicios.service';
import { Categoria } from '../../../../services/models/categoria.model';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from '../../../../services/models/servicio.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-servicio.component.html',
  styleUrl: './editar-servicio.component.css',
})
export class EditarServicioComponent implements OnInit {
  idServicio: number = 0;
  categorias: Categoria[] = [];
  servicio: Servicio = {
    id: 0,
    nombreServicio: '',
    descripcion: '',
    precio: 0,
    rutaImagen: '',
    categoria: {
      id: 0,
      nombreCategoria: '',
    },
  };

  constructor(
    private servService: ServiciosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idServicio = this.activatedRoute.snapshot.params['id'];

    this.servService.getCategoriasServicio().subscribe((res: any) => {
      this.categorias = res;
    });

    this.servService.getServicioById(this.idServicio).subscribe((res: any) => {
      this.servicio = res;
    });
  }

  editarServicio() {
    this.servService.editarServicio(this.servicio).subscribe(null, null, () => {
      Swal.fire({
        title: `<strong class="text-body">Genial!</strong>`,
        icon: 'success',
        html: `
          <p class="text-body-secondary m-0">Se ha editado correctamente el servicio.</p>
        `,
        background: '#303030',
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
      }).then((result) => {
        if (result.isDismissed) {
          window.location.assign('/gestionarServicios');
        }
      });
    });
  }
}
