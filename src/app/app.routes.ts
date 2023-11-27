import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { GestionarReservasComponent } from './components/admin/gestionar-reservas/gestionar-reservas.component';
import { GestionarReservasDetalleComponent } from './components/admin/gestionar-reservas-detalle/gestionar-reservas-detalle.component';

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
    {
        path: 'login',
        title: 'Iniciar Sesion',
        component: LoginComponent
    },
    {
        path: 'register',
        title: 'Registrarse',
        component: RegisterComponent
    },
    {
        path: 'perfil',
        title: 'Perfil',
        component: PerfilComponent
    },
    {
        path: 'reservar/:id',
        title: 'Reservar',
        component: CrearReservaComponent
    },
    {
        path: 'misReservas',
        title: 'Mis Reservas',
        component: MisReservasComponent
    },
    {
        path: 'gestionarReservas',
        title: 'Gestionar Reservas',
        component: GestionarReservasComponent
    },
    {
        path: 'gestionarReservasDetalle',
        title: 'Detalle Reservas',
        component: GestionarReservasDetalleComponent
    }
];