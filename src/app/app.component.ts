import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './core/services/loading.service';

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
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // Inyección limpia del servicio de carga
    public loadingService = inject(LoadingService);
}