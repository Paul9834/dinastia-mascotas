import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from './shared/ui/spinner/spinner.component';
import { LoadingService } from './core/services/loading.service'; // Importamos el servicio

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, GlobalSpinnerComponent],
    template: `
        <!-- El spinner siempre está aquí, esperando la señal para mostrarse -->
        <app-global-spinner></app-global-spinner>

        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    // Inyectamos el servicio para controlarlo manualmente
    private loadingService = inject(LoadingService);

    ngOnInit() {
        // --- MODO DE PRUEBA ---
        // Como no hay backend aún, forzamos el spinner para ver si funciona.

        console.log('Iniciando prueba de Spinner...');
        this.loadingService.show(); // 1. Mostrar Spinner

        setTimeout(() => {
            this.loadingService.hide(); // 2. Ocultar después de 3 segundos
            console.log('Prueba finalizada.');
        }, 3000);
    }
}