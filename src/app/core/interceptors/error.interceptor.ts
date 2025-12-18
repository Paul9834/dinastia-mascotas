import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            // --- AGREGAMOS ESTE LOG PARA VERLO EN CONSOLA ---
            console.log('🔴 Error detectado por Interceptor:', error.status);

            if (error.status === 401 || error.status === 403) {
                console.log('🔒 Token Vencido/Invalido - Cerrando sesión y redirigiendo...');

                localStorage.removeItem('token');
                router.navigate(['/login']);
            }

            return throwError(() => error);
        })
    );
};