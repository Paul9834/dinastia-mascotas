import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet], // Importamos RouterOutlet
    template: `
        <!-- Volvemos al modo dinámico -->
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
}