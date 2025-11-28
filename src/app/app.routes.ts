import { Routes } from '@angular/router';

export const routes: Routes = [
    // 1. Ruta Pública: Login (Sin el Layout Principal)
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component')
            .then(m => m.LoginComponent)
    },

    // 2. Redirección por defecto: Ir al Login al abrir la app
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    // 3. Rutas Privadas (Dentro del MainLayout con Menú)
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component')
            .then(m => m.MainLayoutComponent),
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

    // 4. Ruta de seguridad: Cualquier URL desconocida lleva al login
    { path: '**', redirectTo: 'login' }
];