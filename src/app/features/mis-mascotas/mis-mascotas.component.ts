import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { PetApiService } from '../../core/services/pet-api.service';
import { Pet } from '../../core/models/pet.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-mis-mascotas',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './mis-mascotas.component.html',
    styleUrls: ['./mis-mascotas.component.scss']
})
export class MisMascotasComponent implements OnInit {

    private petApiService = inject(PetApiService);

    pets: Pet[] = [];
    loading = false;

    private readonly mediaBaseUrl = new URL(environment.apiBaseUrl).origin;

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
            error: () => {
                this.loading = false;
            }
        });
    }

    getPetImageUrl(photoUrl?: string | null): string {
        if (!photoUrl) return 'assets/images/pet-placeholder.png';
        if (photoUrl.startsWith('http')) return photoUrl;

        const path = photoUrl.startsWith('/') ? photoUrl : `/${photoUrl}`;
        return `${this.mediaBaseUrl}${path}`;
    }
}
