import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vaccine } from '../models/vaccine.model';

@Injectable({
    providedIn: 'root'
})
export class VaccineService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/v1/vaccines`;

    /**
     * Obtener todas las vacunas de una mascota específica
     * GET /api/v1/vaccines?petId=5
     */
    getVaccinesByPet(petId: number): Observable<Vaccine[]> {
        const params = new HttpParams().set('petId', petId.toString());
        return this.http.get<Vaccine[]>(this.apiUrl, { params });
    }

    /**
     * Registrar una nueva vacuna
     * POST /api/v1/vaccines
     */
    createVaccine(vaccineData: any): Observable<Vaccine> {
        return this.http.post<Vaccine>(this.apiUrl, vaccineData);
    }

    /**
     * Eliminar una vacuna
     * DELETE /api/v1/vaccines/{id}
     */
    deleteVaccine(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}