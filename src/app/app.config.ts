// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser'; // <--- AQUÍ SÍ VA

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration() // <--- AQUÍ SÍ VA
    ]
};