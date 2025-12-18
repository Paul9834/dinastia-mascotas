import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// MatChipsModule ya no es necesario porque hicimos un chip personalizado con CSS
// MatCardModule ya no es estrictamente necesario si usas divs, pero lo dejamos por si acaso.
import { MatCardModule } from '@angular/material/card';

import { PetApiService } from '../../core/services/pet-api.service';
import { Pet } from '../../core/models/pet.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-mis-mascotas',
    standalone: true,
    imports: [
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './mis-mascotas.component.html',
    styleUrls: ['./mis-mascotas.component.scss']
})
export class MisMascotasComponent implements OnInit {

    private petApiService = inject(PetApiService);

    pets: Pet[] = [];
    loading = false;

    // Fallback por si la URL de la API falla o viene vacía
    private readonly mediaBaseUrl = environment.apiBaseUrl ? new URL(environment.apiBaseUrl).origin : '';

    ngOnInit(): void {
        this.loadPets();
    }

    loadPets(): void {
        this.loading = true;

        this.petApiService.getMyPets().subscribe({
            next: (pets) => {
                this.pets = pets;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error cargando mascotas', err);
                this.loading = false;
            }
        });
    }

    getPetImageUrl(photoUrl?: string | null): string {
        if (!photoUrl) return 'assets/avatar-placeholder.png'; // Asegúrate de tener esta imagen
        if (photoUrl.startsWith('http')) return photoUrl;

        const path = photoUrl.startsWith('/') ? photoUrl : `/${photoUrl}`;
        return `${this.mediaBaseUrl}${path}`;
    }
}