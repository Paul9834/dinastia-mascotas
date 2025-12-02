import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service'; // Asegúrate que la ruta sea correcta

@Component({
    selector: 'app-login',
    standalone: true, // Importante: veo que usas standalone
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        RouterModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    // Inyecciones de dependencias (Moderna sintaxis de Angular 16+)
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup;
    hidePassword = true;
    isLoading = false; // Para deshabilitar el botón mientras carga

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]], // 'email' coincide con tu HTML
            password: ['', [Validators.required, Validators.minLength(6)]] // 'password' coincide con tu HTML
        });
    }

    // Función auxiliar para tu HTML (hasError)
    hasError(controlName: string, errorName: string): boolean {
        const control = this.loginForm.get(controlName);
        return !!(control && control.hasError(errorName) && control.touched);
    }

    togglePassword(event: MouseEvent) {
        event.preventDefault(); // Evita que el botón haga submit
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.isLoading = true;

        // Preparamos los datos como los espera Spring Boot (LoginDto)
        const credentials = {
            correo: this.loginForm.value.email,      // Mapeamos 'email' del form a 'correo' del backend
            contrasena: this.loginForm.value.password // Mapeamos 'password' a 'contrasena'
        };

        this.authService.login(credentials).subscribe({
            next: () => {
                console.log('Login Exitoso!');
                this.isLoading = false;
                // Redirigir al Dashboard o Home
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error('Error de login', err);
                this.isLoading = false;
                alert('Usuario o contraseña incorrectos'); // Puedes usar MatSnackBar aquí para algo más bonito
            }
        });
    }
}