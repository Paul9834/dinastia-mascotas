import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// 1. IMPORTAMOS LOS INTERCEPTORES
import { jwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor'; // <--- ¡FALTABA ESTE IMPORT!

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideAnimations(),

        // 2. AGREGAMOS EL ERROR INTERCEPTOR A LA LISTA
        provideHttpClient(withInterceptors([
            jwtInterceptor,
            loadingInterceptor,
            errorInterceptor // <--- ¡AQUÍ ES DONDE OCURRE LA MAGIA!
        ])),

        provideClientHydration(withEventReplay())
    ]
}).catch(err => {
    const errorMsg = err.message || err.toString();
    document.body.innerHTML = `
    <div style="background: #ffebee; color: #c62828; padding: 2rem; font-family: monospace;">
      <h1>☠️ ERROR FATAL AL INICIAR</h1>
      <pre style="background: white; padding: 1rem; border: 1px solid #ef9a9a;">${errorMsg}</pre>
    </div>
  `;
    console.error("ERROR CAPTURADO:", err);
});