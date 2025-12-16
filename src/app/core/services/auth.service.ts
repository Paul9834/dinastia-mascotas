import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private backendUrl = 'http://localhost:8080/api';

    // Método para Iniciar Sesión
    login(credentials: { correo: string; contrasena: string }): Observable<any> {
        // CAMBIO 2: Ajustamos la ruta para que sea /auth/login
        return this.http.post<{ token: string }>(`${this.backendUrl}/auth/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
            })
        );
    }

    // NUEVO MÉTODO: Registro de Usuario
    registro(datosUsuario: any): Observable<any> {
        // Si no viene el rol, le ponemos 'CLIENTE' por defecto para que el backend no falle
        const payload = { ...datosUsuario, rolNombre: 'CLIENTE' };

        // Enviamos a /usuarios/registro
        return this.http.post(`${this.backendUrl}/usuarios/registro`, payload);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}