import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// Eliminamos MatCardModule porque ya no lo usamos en el HTML
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        RouterModule,
        MatSnackBarModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    registerForm: FormGroup;
    hidePassword = true;
    isLoading = false;

    constructor() {
        this.registerForm = this.fb.group({
            nombre: ['', [Validators.required]],
            apellido: ['', [Validators.required]],
            telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            correo: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    togglePassword(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        this.isLoading = true;
        const datosFormulario = this.registerForm.value;

        // 1. REGISTRO
        this.authService.registro(datosFormulario).subscribe({
            next: () => {
                // 2. AUTO-LOGIN
                this.authService.login({
                    correo: datosFormulario.correo,
                    contrasena: datosFormulario.contrasena
                }).subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.snackBar.open('¡Bienvenido a la familia!', 'Cerrar', {
                            duration: 3000,
                            panelClass: ['success-snackbar'] // Puedes estilizar esto globalmente
                        });
                        this.router.navigate(['/dashboard']);
                    },
                    error: (err) => {
                        this.isLoading = false;
                        console.error('Error auto-login', err);
                        this.router.navigate(['/login']);
                    }
                });
            },
            error: (err) => {
                this.isLoading = false;
                console.error(err);
                this.snackBar.open('Error al registrar. Verifica tus datos.', 'Cerrar', { duration: 3000 });
            }
        });
    }
}