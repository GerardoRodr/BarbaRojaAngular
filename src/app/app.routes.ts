import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Barba Roja',
        component: InicioComponent
    },    
    {
        path: 'servicios',
        title: 'Servicios',
        component: ServiciosComponent
    },

];