import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component')
            .then(m => m.MainLayoutComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

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
            // --------------------------------------------------
            {
                path: 'vacunas',
                loadComponent: () => import('./features/vaccines/vacunas.component') // Asegúrate que la carpeta coincida (vacunas vs vaccines)
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

    { path: '**', redirectTo: 'dashboard' }
];