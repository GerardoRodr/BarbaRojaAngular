import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../../services/models/categoria.model';
import { ServiciosService } from '../../../../services/servicios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-servicio.component.html',
  styleUrl: './crear-servicio.component.css'
})
export class CrearServicioComponent implements OnInit{

  formulario: FormGroup;

  categorias: Categoria[] = []

  constructor(private servService: ServiciosService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombreServicio: [''],
      descripcion: [''],
      precio: [0],
      categoriaId: [null],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.servService.getCategoriasServicio().subscribe( (res:any) => {
      this.categorias = res;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.formulario!.get('imagen')!.setValue(file);
  }
  
  enviarDatos(): void {
    const nombreServicio = this.formulario.get('nombreServicio')?.value || '';
    const descripcion = this.formulario.get('descripcion')?.value || '';
    const precio = this.formulario.get('precio')?.value || 0;
    const categoriaId = this.formulario.get('categoriaId')?.value || 0;
  
    const formData = new FormData();
    formData.append('nombreServicio', nombreServicio);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('categoria.id', categoriaId);
  
    const imagen = this.formulario.get('imagen')?.value;
    if (imagen instanceof File) {
      formData.append('imagen', imagen);
    }
  
    this.servService.crearServicio(formData).subscribe(
      (res:any) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      },
      () => {
        Swal.fire({
          title: `<strong class="text-body">Genial!</strong>`,
          icon: 'success',
          html: `
            <p class="text-body-secondary m-0">Se ha creado correctamente el servicio.</p>
          `,
          background: '#303030',
          buttonsStyling: false,
          showCloseButton: true,
          showConfirmButton: false,
          focusConfirm: false,
        }).then( (result) => {
          if (result.isDismissed) {
            window.location.assign('/gestionarServicios')
          }
        })
      }
    )
  }
}