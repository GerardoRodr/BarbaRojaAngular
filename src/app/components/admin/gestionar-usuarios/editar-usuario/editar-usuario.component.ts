import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Usuario } from '../../../../services/models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit{
  idUsuario = 0;
  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    correo: '',
    pass: '',
    telefono: '',
    admin: false
  }

  constructor(private userService: UsuariosService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
    this.userService.getUsuarioById(this.idUsuario).subscribe((res:any) => {
      this.usuario = res;
    });
  }

  editarUsuario(idUsuario: number, nombreUsuario: string) {
    this.userService.editarUsuario(idUsuario, this.usuario).subscribe(null,null, () => {
      Swal.fire({
        title: `<strong class="text-body">Genial!</strong>`,
        icon: 'success',
        html: `
          <p class="text-body-secondary m-0">Se ha editado correctamente el usuario ${nombreUsuario}</p>
        `,
        background: '#303030',
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
      }).then((result) => {
        if (result.isDismissed) {
          window.location.assign('/gestionarUsuarios');
        }
      });
    })
  }
}