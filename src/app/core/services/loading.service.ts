import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    // Signal que guarda el estado: true (cargando) o false (listo)
    isLoading = signal<boolean>(false);

    show() {
        this.isLoading.set(true);
    }

    hide() {
        this.isLoading.set(false);
    }
}