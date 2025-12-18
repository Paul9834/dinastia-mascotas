import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { environment } from '../../../environments/environment'; // Asegúrate de tener tu URL base aquí

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = `${environment.apiBaseUrl}/v1/appointments`;

    constructor(private http: HttpClient) {}

    // Obtener mis citas (el backend filtra por el token del usuario)
    getMyAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.apiUrl);
    }

    // Crear una cita nueva (para el botón "+ Nuevo" rojo del diseño)
    createAppointment(appointment: any): Observable<Appointment> {
        return this.http.post<Appointment>(this.apiUrl, appointment);
    }
}