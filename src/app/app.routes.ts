import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';

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
    }
];