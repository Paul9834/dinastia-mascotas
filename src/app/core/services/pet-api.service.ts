import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, CreatePetRequest, UpdatePetRequest } from '../models/pet.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PetApiService {
    private http = inject(HttpClient);

    private readonly apiUrl = `${environment.apiBaseUrl}/pets`;

    getMyPets(): Observable<Pet[]> {
        return this.http.get<Pet[]>(this.apiUrl);
    }

    getPetById(id: number): Observable<Pet> {
        return this.http.get<Pet>(`${this.apiUrl}/${id}`);
    }

    createPet(payload: CreatePetRequest): Observable<Pet> {
        return this.http.post<Pet>(this.apiUrl, payload);
    }

    updatePet(id: number, payload: UpdatePetRequest): Observable<Pet> {
        return this.http.put<Pet>(`${this.apiUrl}/${id}`, payload);
    }

    deletePet(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
