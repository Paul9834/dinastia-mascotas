import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// RECUPERAMOS TUS INTERCEPTORES (VITALES PARA QUE FUNCIONE)
import { jwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        // 1. Router con Input Binding (Recomendado)
        provideRouter(routes, withComponentInputBinding()),

        // 2. Animaciones
        provideAnimations(),

        // 3. HTTP CON INTERCEPTORES (¡ESTO FALTABA!)
        // Sin esto, Ngrok bloquea la conexión y no hay spinner
        provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor])),

        // 4. Hidratación (Lo dejé porque lo incluiste, opcional en CSR)
        provideClientHydration(withEventReplay())
    ]
}).catch(err => {
    // 🚨 TRAMPA DE ERRORES: Muestra el error en la pantalla blanca
    const errorMsg = err.message || err.toString();
    document.body.innerHTML = `
    <div style="background: #ffebee; color: #c62828; padding: 2rem; font-family: monospace;">
      <h1>☠️ ERROR FATAL AL INICIAR</h1>
      <h2 style="margin-top: 1rem;">Mensaje:</h2>
      <pre style="background: white; padding: 1rem; border: 1px solid #ef9a9a;">${errorMsg}</pre>
      <h2 style="margin-top: 1rem;">Detalles Técnicos:</h2>
      <pre>${err.stack || 'Sin stack trace'}</pre>
    </div>
  `;
    console.error("ERROR CAPTURADO:", err);
});