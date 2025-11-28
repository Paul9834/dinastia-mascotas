import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importante para la navegación
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

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
    template: `
        <div class="page-container">

            <div class="page-header">
                <div>
                    <h1 class="title">Mis Mascotas</h1>
                    <p class="subtitle">Gestiona los perfiles médicos de tus compañeros</p>
                </div>
                <!-- Botón Añadir -->
                <button mat-flat-button color="primary" routerLink="/mascotas/nueva" class="add-btn">
                    <mat-icon>add</mat-icon> AÑADIR MASCOTA
                </button>
            </div>

            <div class="pets-grid">
                <!-- Tarjeta de Mascota -->
                <mat-card *ngFor="let pet of pets" class="pet-card">
                    <div class="pet-image" [style.background-image]="'url(' + pet.image + ')'"></div>

                    <mat-card-content class="pet-content">
                        <div class="pet-header">
                            <h2 class="pet-name">{{ pet.name }}</h2>
                            <mat-chip class="status-chip">{{ pet.age }}</mat-chip>
                        </div>
                        <p class="pet-breed">{{ pet.breed }}</p>

                        <div class="pet-stats">
                            <div class="stat">
                                <mat-icon>vaccines</mat-icon>
                                <span>{{ pet.vaccines }} Vacunas</span>
                            </div>
                            <div class="stat">
                                <mat-icon>event</mat-icon>
                                <span>Próx: {{ pet.nextAppt }}</span>
                            </div>
                        </div>
                    </mat-card-content>

                    <mat-card-actions align="end">
                        <button mat-stroked-button color="primary" routerLink="/mascotas/perfil" class="carnet-btn">
                            CARNET DE VACUNAS
                        </button>
                    </mat-card-actions>
                </mat-card>

                <!-- Tarjeta Placeholder -->
                <div class="add-card-placeholder" routerLink="/mascotas/nueva">
                    <div class="placeholder-content">
                        <div class="icon-circle"><mat-icon>add</mat-icon></div>
                        <h3>Registrar Nuevo</h3>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .page-container { padding: 32px; max-width: 1200px; margin: 0 auto; font-family: 'Roboto', sans-serif; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
        .title { font-size: 2rem; margin: 0; color: #1a1a1a; font-weight: 700; }
        .subtitle { margin: 4px 0 0; color: #666; font-size: 1rem; }

        .add-btn { height: 48px; padding: 0 24px; border-radius: 24px; font-weight: 600; background-color: #2E7D32; color: white; }

        .pets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

        .pet-card { border-radius: 16px; overflow: hidden; transition: transform 0.2s; border: 1px solid rgba(0,0,0,0.05); display: flex; flex-direction: column; }
        .pet-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }

        .pet-image { height: 200px; background-size: cover; background-position: center; }
        .pet-content { padding: 16px 20px 0; flex: 1; }

        .pet-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .pet-name { margin: 0; font-size: 1.25rem; font-weight: 600; }
        .pet-breed { color: #666; margin: 0 0 16px; font-size: 0.95rem; }

        .status-chip { min-height: 24px; font-size: 0.8rem; background-color: #e8f5e9; color: #2E7D32; }

        .pet-stats { display: flex; gap: 16px; padding-top: 12px; border-top: 1px solid #eee; margin-bottom: 8px; }
        .stat { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: #555; }
        .stat mat-icon { font-size: 18px; width: 18px; height: 18px; color: #81c784; }

        .carnet-btn { width: 100%; border: 1px solid #2E7D32; color: #2E7D32; font-weight: 600; margin: 8px 16px 16px; }

        .add-card-placeholder { border: 2px dashed #ccc; border-radius: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; min-height: 380px; background-color: #fafafa; transition: all 0.2s; }
        .add-card-placeholder:hover { border-color: #2E7D32; background-color: #e8f5e9; }
        .add-card-placeholder:hover .icon-circle { background-color: #2E7D32; color: white; }
        .add-card-placeholder:hover h3 { color: #2E7D32; }
        .icon-circle { width: 64px; height: 64px; border-radius: 50%; background-color: #eee; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #666; transition: all 0.2s; }
        h3 { margin: 0; color: #666; font-weight: 500; }
    `]
})
export class MisMascotasComponent {
    pets = [
        {
            name: 'Max',
            breed: 'Golden Retriever',
            age: '3 años',
            image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=300&fit=crop',
            vaccines: 5,
            nextAppt: '15 Oct'
        },
        {
            name: 'Luna',
            breed: 'Gato Siamés',
            age: '2 años',
            image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop',
            vaccines: 3,
            nextAppt: '20 Nov'
        }
    ];
}