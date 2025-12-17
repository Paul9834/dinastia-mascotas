import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private readonly baseUrl = environment.apiBaseUrl;

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
            tap(res => localStorage.setItem('token', res.token))
        );
    }

    registro(data: RegisterRequest): Observable<RegisterResponse> {
        const payload = { ...data, rolNombre: 'CLIENTE' };
        return this.http.post<RegisterResponse>(`${this.baseUrl}/usuarios/registro`, payload);
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
