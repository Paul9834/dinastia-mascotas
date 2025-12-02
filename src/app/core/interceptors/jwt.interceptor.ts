import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    // Clonamos la petición para agregar las cabeceras necesarias
    let request = req.clone({
        setHeaders: {
            // 1. ¡ESTA ES LA CLAVE! 🗝️
            // Le dice a Ngrok que se salte la pantalla de advertencia
            'ngrok-skip-browser-warning': 'true',

            // 2. Aseguramos que siempre hablemos JSON
            // 'Content-Type': 'application/json' // (Opcional, Angular suele ponerlo solo)
        }
    });

    // 3. Si tenemos token, lo agregamos (como ya hacíamos antes)
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(request);
};