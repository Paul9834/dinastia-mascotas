import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-vacunas',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatTabsModule,
        MatMenuModule
    ],
    template: `
        <div class="page-container">

            <div class="page-header">
                <div>
                    <h1 class="title">Registro de Vacunación</h1>
                    <p class="subtitle">Historial médico y próximas dosis</p>
                </div>
                <button mat-flat-button class="add-btn">
                    <mat-icon>add</mat-icon> REGISTRAR VACUNA
                </button>
            </div>

            <!-- Filtros por Mascota -->
            <mat-tab-group mat-stretch-tabs="false" animationDuration="0ms" class="custom-tabs">
                <mat-tab label="Todas"></mat-tab>
                <mat-tab label="Max"></mat-tab>
                <mat-tab label="Luna"></mat-tab>
            </mat-tab-group>

            <div class="vaccines-grid">

                <!-- Tarjeta de Vacuna Ajustada a la Imagen -->
                <mat-card *ngFor="let v of vacunas" class="vaccine-card">
                    <mat-card-content class="card-content">

                        <!-- Encabezado de la Tarjeta: Nombre y Menú -->
                        <div class="card-top">
                            <h3 class="vaccine-name">{{ v.vaccine }}</h3>
                            <button mat-icon-button [matMenuTriggerFor]="menu" class="more-btn">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item>
                                    <mat-icon>edit</mat-icon><span>Editar</span>
                                </button>
                                <button mat-menu-item>
                                    <mat-icon>delete</mat-icon><span>Eliminar</span>
                                </button>
                            </mat-menu>
                        </div>

                        <!-- Estado (Status) -->
                        <div class="status-row">
              <span class="status-text" [ngClass]="v.statusClass">
                {{ v.status }}
              </span>
                        </div>

                        <div class="divider"></div>

                        <!-- Grilla de Detalles (Dates & Vet) -->
                        <div class="details-grid">
                            <div class="detail-item">
                                <span class="label">Aplicada</span>
                                <span class="value">{{ v.dateGiven }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Vence</span>
                                <span class="value">{{ v.expiresOn }}</span>
                            </div>
                            <div class="detail-item full-width">
                                <span class="label">Veterinario</span>
                                <span class="value vet-value">{{ v.vet }}</span>
                            </div>
                        </div>

                    </mat-card-content>
                </mat-card>

            </div>
        </div>
    `,
    styles: [`
        .page-container { padding: 32px; max-width: 1000px; margin: 0 auto; font-family: 'Roboto', sans-serif; }

        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        .title { font-size: 1.8rem; margin: 0; color: #1a1a1a; font-weight: 700; }
        .subtitle { margin: 4px 0 0; color: #666; font-size: 1rem; }

        .add-btn { background-color: #4FC3F7; color: white; height: 48px; border-radius: 8px; font-weight: 600; padding: 0 24px; box-shadow: none; }

        .custom-tabs { margin-bottom: 32px; }

        .vaccines-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Grid responsivo */
            gap: 20px;
        }

        .vaccine-card {
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.03);
            border: 1px solid rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .vaccine-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }

        .card-content { padding: 20px !important; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; }

        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .vaccine-name { margin: 0; font-size: 1.1rem; font-weight: 600; color: #37474F; line-height: 1.3; }
        .more-btn { margin-top: -8px; margin-right: -8px; color: #90A4AE; }

        .status-row { margin-bottom: 16px; }
        .status-text { font-size: 0.85rem; font-weight: 600; padding: 4px 8px; border-radius: 4px; display: inline-block; }

        /* Colores de Estado basados en la imagen */
        .status-active { color: #00BFA5; background-color: rgba(0, 191, 165, 0.1); }
        .status-due { color: #FFD600; background-color: rgba(255, 214, 0, 0.1); }
        .status-overdue { color: #FF5252; background-color: rgba(255, 82, 82, 0.1); }

        .divider { height: 1px; background-color: #ECEFF1; margin-bottom: 16px; }

        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .detail-item { display: flex; flex-direction: column; }
        .detail-item.full-width { grid-column: span 2; }

        .label { font-size: 0.75rem; color: #90A4AE; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 600; }
        .value { font-size: 0.95rem; color: #546E7A; }
        .vet-value { color: #78909C; }

        @media (max-width: 600px) {
            .vaccines-grid { grid-template-columns: 1fr; }
        }
    `]
})
export class VacunasComponent {
    // Datos actualizados para coincidir con la imagen de referencia
    vacunas = [
        {
            vaccine: 'Rabies (1-year)',
            dateGiven: 'Aug 20, 2023',
            expiresOn: 'Aug 20, 2024',
            vet: 'City Vet Clinic',
            status: 'Active',
            statusClass: 'status-active'
        },
        {
            vaccine: 'DHPP (Booster)',
            dateGiven: 'Jun 15, 2023',
            expiresOn: 'Jun 15, 2024',
            vet: 'Dr. Emily Carter',
            status: 'Due Soon',
            statusClass: 'status-due'
        },
        {
            vaccine: 'Bordetella',
            dateGiven: 'Dec 01, 2022',
            expiresOn: 'Dec 01, 2023',
            vet: 'City Vet Clinic',
            status: 'Overdue',
            statusClass: 'status-overdue'
        },
        {
            vaccine: 'Leptospirosis',
            dateGiven: 'Aug 20, 2023',
            expiresOn: 'Aug 20, 2024',
            vet: 'Dr. Emily Carter',
            status: 'Active',
            statusClass: 'status-active'
        }
    ];
}