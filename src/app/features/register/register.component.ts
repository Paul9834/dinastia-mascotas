import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
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
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        this.isLoading = true;
        const datosFormulario = this.registerForm.value;

        // 1. Intentamos REGISTRAR
        this.authService.registro(datosFormulario).subscribe({
            next: () => {
                // 2. Si el registro es ÉXITOSO, hacemos AUTO-LOGIN inmediatamente
                // Usamos el correo y contraseña que el usuario acaba de escribir
                this.authService.login({
                    correo: datosFormulario.correo,
                    contrasena: datosFormulario.contrasena
                }).subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.snackBar.open('¡Bienvenido a Dinastía Mascotas!', 'Cerrar', { duration: 3000 });
                        // 3. Vamos directo al Dashboard
                        this.router.navigate(['/dashboard']);
                    },
                    error: (err) => {
                        // Si falla el autologin (raro), lo mandamos al login manual
                        this.isLoading = false;
                        console.error('Error en auto-login', err);
                        this.router.navigate(['/login']);
                    }
                });
            },
            error: (err) => {
                this.isLoading = false;
                console.error(err);
                this.snackBar.open('Error al registrar. Verifica si el correo ya existe.', 'Cerrar', { duration: 3000 });
            }
        });
    }
}