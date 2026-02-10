import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // <--- IMPORTANTE
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';

// Tus interceptores
import { jwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),

        // 1. ANIMACIONES (CRÍTICO PARA DIALOGS)
        provideAnimations(),

        // 2. HTTP CON INTERCEPTORES
        provideHttpClient(withInterceptors([
            loadingInterceptor,
            jwtInterceptor,
            errorInterceptor
        ])),

        // 3. (OPCIONAL) Quita hydration un momento para probar
        // provideClientHydration()
    ]
}).catch(err => console.error(err));