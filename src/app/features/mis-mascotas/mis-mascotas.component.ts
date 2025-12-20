import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// Importamos las funciones de animación
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
    styleUrls: ['./mis-mascotas.component.scss'],
    // 👇 DEFINICIÓN DE ANIMACIONES
    animations: [
        trigger('fadeInUp', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('staggerList', [
                transition(':enter', [
                    query('.pet-card, .add-card-placeholder', [
                        style({ opacity: 0, transform: 'translateY(20px)' }),
                        stagger('100ms', [
                            animate('0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
                        ])
                    ], { optional: true })
                ])
            ]
        )]
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
        if (!photoUrl) return 'assets/avatar-placeholder.png';
        if (photoUrl.startsWith('http')) return photoUrl;

        // Limpieza de slashes dobles si es necesario
        const path = photoUrl.startsWith('/') ? photoUrl : `/${photoUrl}`;
        return `${this.mediaBaseUrl}${path}`;
    }
}