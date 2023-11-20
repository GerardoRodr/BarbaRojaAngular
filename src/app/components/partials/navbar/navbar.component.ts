import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  isLogged: Boolean = false;
  nombreCliente: string = ''

  constructor(private clienteService: ClientesService) {}

  //Verificacion al inicio si es que esta logeado
  ngOnInit() {
    //Solo se ejecutara si el código se está ejecutando en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = Number(localStorage.getItem('userId') || 0);
      this.isLogged = !!userId;
      
      if(this.isLogged) {
        this.clienteService.getClienteById(userId).subscribe(
          (response: any) => {
            this.nombreCliente = response.nombreCliente;
          },
          (err) => {
            this.isLogged = false;
            console.log(err)
          }
        )
      }
    }
  }

  cerrarSesion() {
    //Se elimina el id del Usuario del localStorage
    localStorage.removeItem('userId');
    //Se redirige recargando la pagina al inicio
    window.location.assign('/');
  }

}