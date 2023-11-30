import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosDestacadosComponent } from '../partials/servicios-destacados/servicios-destacados.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ServiciosDestacadosComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent{
}
