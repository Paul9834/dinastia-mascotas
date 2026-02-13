import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private platformId = inject(PLATFORM_ID);

    private readonly baseUrl = environment.apiBaseUrl;
    private readonly tokenKey = 'token';

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
            tap(res => this.setToken(res.token))
        );
    }

    registro(data: RegisterRequest): Observable<RegisterResponse> {
        const payload = { ...data, rolNombre: 'CLIENTE' };
        return this.http.post<RegisterResponse>(`${this.baseUrl}/usuarios/registro`, payload);
    }

    logout() {
        this.clearToken();
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        return localStorage.getItem(this.tokenKey);
    }

    private setToken(token: string) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        localStorage.setItem(this.tokenKey, token);
    }

    private clearToken() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        localStorage.removeItem(this.tokenKey);
    }
}
