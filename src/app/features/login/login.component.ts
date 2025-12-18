import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// 👇 1. IMPORTANTE: Asegúrate de que esta ruta sea correcta hacia tu servicio
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        RouterModule,
        MatSnackBarModule // 👇 2. Agregamos esto para mensajes de error bonitos
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    // 👇 3. INYECCIÓN REAL DEL SERVICIO (Descomentado)
    private authService = inject(AuthService);

    loginForm: FormGroup;
    hidePassword = true;
    isLoading = false;

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    togglePassword(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.isLoading = true; // Activa spinner del botón

        // Preparamos datos para el Backend
        const credentials = {
            correo: this.loginForm.value.email,
            contrasena: this.loginForm.value.password
        };

        // 👇 4. LÓGICA HTTP REAL (Ya no es simulación)
        this.authService.login(credentials).subscribe({
            next: (response) => {
                console.log('Login Exitoso:', response);

                // Opcional: Guardar token si tu servicio no lo hace automático
                // localStorage.setItem('token', response.token);

                this.isLoading = false;
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error('Error de login', err);
                this.isLoading = false;

                // Mostrar mensaje de error visual al usuario
                let mensaje = 'Error al iniciar sesión. Verifica tus datos.';
                if (err.status === 401 || err.status === 403) {
                    mensaje = 'Correo o contraseña incorrectos.';
                }

                this.snackBar.open(mensaje, 'Cerrar', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'] // Puedes estilizar esto en styles.scss
                });
            }
        });
    }
}