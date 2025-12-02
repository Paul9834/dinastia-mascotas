import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Asegúrate que la ruta al servicio sea correcta
import { LoadingService } from '@core/services/loading.service';

@Component({
    selector: 'app-global-spinner',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    template: `
        @if (loadingService.isLoading()) {
            <div class="spinner-overlay">
                <mat-spinner diameter="50" color="accent"></mat-spinner>
            </div>
        }
    `,
    styles: [`
        .spinner-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255, 255, 255, 0.7);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(2px);
        }
    `]
})
export class GlobalSpinnerComponent {
    public loadingService = inject(LoadingService);
}