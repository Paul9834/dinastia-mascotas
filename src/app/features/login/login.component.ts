import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Router } from '@angular/router'; // 1. Importar Router

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        RouterModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    hidePassword = true;

    // 2. Inyectar el Router en el constructor
    constructor(private fb: FormBuilder, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // Método helper para validar en el HTML
    hasError(controlName: string, errorName: string): boolean {
        const control = this.loginForm.get(controlName);
        return control ? control.hasError(errorName) : false;
    }

    togglePassword(event: Event) {
        event.preventDefault();
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Login Data:', this.loginForm.value);

            // 3. ¡Línea de prueba agregada! Redirige al dashboard
            this.router.navigate(['/dashboard']);
        }
    }
}