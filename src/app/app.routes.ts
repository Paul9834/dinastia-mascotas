import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
// 1. IMPORTANTE: Importar el componente de la Landing Page
import { LandingPageComponent } from '@features/landing/landing-page.component';

export const routes: Routes = [
    // 2. RUTA PRINCIPAL (HOME): Ahora carga la Landing Page
    {
        path: '',
        component: LandingPageComponent,
        pathMatch: 'full'
    },

    // 3. Rutas Públicas de Autenticación
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegisterComponent
    },

    // 4. Rutas Privadas (Dashboard y gestión)
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component')
            .then(m => m.MainLayoutComponent),
        canActivate: [authGuard], // 🔒 Solo usuarios logueados pasan de aquí
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
            {
                path: 'mascotas/nueva',
                loadComponent: () => import('./features/mis-mascotas/anadir-mascota.component')
                    .then(m => m.AnadirMascotaComponent)
            },
            {
                path: 'mascotas/perfil',
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

    // 5. Ruta comodín: Si la URL no existe, mandar a la Landing Page (o al login si prefieres)
    { path: '**', redirectTo: '' }
];