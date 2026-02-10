import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Deworming {
    id: number;
    product: string;
    method?: string;
    veterinarian?: string;
    applicationDate: string;
    nextDueDate?: string;
    notes?: string;
    verified: boolean;
    pet: {
        id: number;
    };
}

export interface CreateDeworming {
    petId: number;
    product: string;
    method?: string;
    veterinarian?: string;
    applicationDate: string;
    nextDueDate?: string | null;
    notes?: string | null;
    verified: boolean;
}



@Injectable({
    providedIn: 'root'
})
export class DewormingService {

    private apiUrl = `${environment.apiBaseUrl}/dewormings`;

    constructor(private http: HttpClient) {}

    getByPet(petId: number): Observable<Deworming[]> {
        return this.http.get<Deworming[]>(`${this.apiUrl}/pet/${petId}`);
    }

    getById(id: number): Observable<Deworming> {
        return this.http.get<Deworming>(`${this.apiUrl}/${id}`);
    }

    create(deworming: CreateDeworming): Observable<Deworming> {
        return this.http.post<Deworming>(this.apiUrl, deworming);
    }

    update(id: number, deworming: Deworming): Observable<Deworming> {
        return this.http.put<Deworming>(`${this.apiUrl}/${id}`, deworming);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}