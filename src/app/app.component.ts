import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // <--- 1. Importar esto
import { LoadingService } from './core/services/loading.service'; // <--- 2. Importar tu servicio

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    template: `
        <router-outlet></router-outlet>
        
        @if (loadingService.isLoading$ | async) {
          <div class="loading-overlay">
            <div class="spinner-container">
              <div class="spinner"></div>
              <p>Cargando...</p>
            </div>
          </div>
        }
        `,
    styleUrls: ['./app.component.scss'] // Asegúrate de tener los estilos aquí
})
export class AppComponent {
    public loadingService = inject(LoadingService);
}