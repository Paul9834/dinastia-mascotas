import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    // 1. OBTENER LA URL EN MINÚSCULAS PARA COMPARAR
    const url = req.url.toLowerCase();

    // 2. LISTA NEGRA: Rutas donde NUNCA debemos enviar token
    // Agregamos 'login', 'registro', 'auth' para asegurarnos
    const isAuthRoute =
        url.includes('/auth/login') ||
        url.includes('/login') ||      // <--- Agregamos esto por seguridad
        url.includes('/registro') ||
        url.includes('/usuarios/registro');

    // Headers base
    let headersConfig: any = {
        'ngrok-skip-browser-warning': 'true'
    };

    // 3. SOLO AGREGAR TOKEN SI NO ES RUTA DE AUTH
    if (token && !isAuthRoute) {
        headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({
        setHeaders: headersConfig
    });

    return next(request);
};