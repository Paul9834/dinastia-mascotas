import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

// Importa tus interceptores
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor'; // <--- 1. IMPORTAR

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),

        // 2. AGREGAR A LA LISTA
        provideHttpClient(withInterceptors([
            loadingInterceptor,
            jwtInterceptor,
            errorInterceptor // <--- El orden importa: este va al final para atrapar errores
        ]))
    ]
};