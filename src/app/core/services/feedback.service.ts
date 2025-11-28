import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private snackBar = inject(MatSnackBar);

    // Mensaje de Éxito (Verde)
    showSuccess(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'] // Puedes personalizar este estilo en styles.scss
        });
    }

    // Mensaje de Error (Rojo)
    showError(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    }

    // Mensaje Informativo (Neutro)
    showInfo(message: string) {
        this.snackBar.open(message, 'Ok', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
        });
    }
}