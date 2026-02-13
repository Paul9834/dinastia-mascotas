import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';

// Importa tus interceptores
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor'; // <--- 1. IMPORTAR

const ES_DATE_FORMATS = {
    parse: {
        dateInput: null
    },
    display: {
        dateInput: { day: '2-digit', month: '2-digit', year: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' }
    }
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(),
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: MAT_DATE_FORMATS, useValue: ES_DATE_FORMATS },

        // 2. AGREGAR A LA LISTA
        provideHttpClient(withInterceptors([
            loadingInterceptor,
            jwtInterceptor,
            errorInterceptor // <--- El orden importa: este va al final para atrapar errores
        ]))
    ]
};
