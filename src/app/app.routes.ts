import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LandingPageComponent } from '@features/landing/landing-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegisterComponent
    },

    // Rutas Privadas
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component')
            .then(m => m.MainLayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                path: 'mascotas',
                loadComponent: () => import('./features/mis-mascotas/mis-mascotas.component')
                    .then(m => m.MisMascotasComponent)
            },
            // ⚠️ ORDEN IMPORTANTE:
            // Primero la ruta específica "nueva"
            {
                path: 'mascotas/nueva',
                loadComponent: () => import('@features/mis-mascotas/anadir-mascota/anadir-mascota.component')
                    .then(m => m.AnadirMascotaComponent)
            },
            // ⚠️ LUEGO la ruta dinámica con :id (Reemplaza a 'mascotas/perfil')
            // Esto captura /mascotas/1, /mascotas/5, etc.
            {
                path: 'mascotas/:id',
                loadComponent: () => import('./features/pets-profile/pets-profile.component')
                    .then(m => m.PetProfileComponent)
            },
            {
                path: 'vacunas',
                loadComponent: () => import('./features/vaccines/vacunas.component')
                    .then(m => m.VacunasComponent)
            },
            {
                path: 'calendario',
                loadComponent: () => import('./features/calendario/calendario.component')
                    .then(m => m.CalendarioComponent)
            },
            {
                path: 'configuracion',
                loadComponent: () => import('./features/configuracion/configuracion.component')
                    .then(m => m.ConfiguracionComponent)
            }
        ]
    },

    { path: '**', redirectTo: '' }
];