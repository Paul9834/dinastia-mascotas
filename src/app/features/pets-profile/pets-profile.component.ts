import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-pet-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatChipsModule,
        RouterModule
    ],
    template: `
        <div class="profile-page">
            <div class="profile-container">

                <!-- Navegación superior -->
                <div class="breadcrumbs">
                    <a routerLink="/mascotas" class="back-link">
                        <mat-icon>arrow_back</mat-icon> Mis Mascotas
                    </a>
                    <span class="separator">/</span>
                    <span class="current">Max</span>
                </div>

                <div class="profile-grid">

                    <!-- COLUMNA IZQUIERDA: Identidad y Datos -->
                    <div class="left-col">
                        <mat-card class="identity-card">
                            <div class="avatar-wrapper">
                                <img src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=300&fit=crop" alt="Max">
                            </div>

                            <div class="identity-info">
                                <h1 class="pet-name">Max</h1>
                                <p class="pet-breed">Golden Retriever</p>

                                <div class="status-badge">
                                    <mat-icon>check_circle</mat-icon>
                                    <span>Calendario al día</span>
                                </div>
                            </div>

                            <button mat-stroked-button class="edit-btn">Editar Perfil</button>
                        </mat-card>

                        <!-- Datos Rápidos -->
                        <div class="quick-facts-section">
                            <h3>Datos Rápidos</h3>
                            <div class="fact-row">
                                <span class="label">Nacimiento</span>
                                <span class="value">15 Ene, 2020</span>
                            </div>
                            <div class="fact-row">
                                <span class="label">Sexo</span>
                                <span class="value">Macho</span>
                            </div>
                            <div class="fact-row">
                                <span class="label">Peso</span>
                                <span class="value">32 kg</span>
                            </div>
                            <div class="fact-row">
                                <span class="label">Microchip</span>
                                <span class="value">98511200223</span>
                            </div>
                            <div class="fact-row">
                                <span class="label">Veterinaria</span>
                                <span class="value">City Vet Clinic</span>
                            </div>
                        </div>
                    </div>

                    <!-- COLUMNA DERECHA: Historial Médico -->
                    <div class="right-col">

                        <div class="section-header">
                            <h2>Historial Médico</h2>
                            <div class="header-actions">
                                <button mat-flat-button class="share-btn">
                                    <mat-icon>share</mat-icon> COMPARTIR
                                </button>
                                <button mat-icon-button color="warn" class="delete-btn">
                                    <mat-icon>delete_outline</mat-icon>
                                </button>
                            </div>
                        </div>

                        <!-- Tabs de Navegación -->
                        <mat-tab-group mat-stretch-tabs="false" animationDuration="0ms" class="profile-tabs">
                            <mat-tab label="Historial Vacunas"></mat-tab>
                            <mat-tab label="Tratamientos"></mat-tab>
                            <mat-tab label="Documentos"></mat-tab>
                        </mat-tab-group>

                        <!-- Tabla de Vacunas -->
                        <mat-card class="vaccine-table-card">
                            <div class="table-header">
                                <h3>Registro de Vacunación</h3>
                                <button mat-stroked-button class="register-btn">
                                    + Registrar Vacuna
                                </button>
                            </div>

                            <div class="table-responsive">
                                <table mat-table [dataSource]="vaccines" class="simple-table">

                                    <!-- Columna Vacuna -->
                                    <ng-container matColumnDef="vaccine">
                                        <th mat-header-cell *matHeaderCellDef> VACUNA </th>
                                        <td mat-cell *matCellDef="let element" class="vaccine-name">
                                            {{element.vaccine}}
                                        </td>
                                    </ng-container>

                                    <!-- Columna Fecha -->
                                    <ng-container matColumnDef="date">
                                        <th mat-header-cell *matHeaderCellDef> FECHA </th>
                                        <td mat-cell *matCellDef="let element"> {{element.date}} </td>
                                    </ng-container>

                                    <!-- Columna Vence -->
                                    <ng-container matColumnDef="expires">
                                        <th mat-header-cell *matHeaderCellDef> VENCE </th>
                                        <td mat-cell *matCellDef="let element"> {{element.expires}} </td>
                                    </ng-container>

                                    <!-- Columna Veterinario -->
                                    <ng-container matColumnDef="vet">
                                        <th mat-header-cell *matHeaderCellDef> VETERINARIO </th>
                                        <td mat-cell *matCellDef="let element"> {{element.vet}} </td>
                                    </ng-container>

                                    <!-- Columna Estado -->
                                    <ng-container matColumnDef="status">
                                        <th mat-header-cell *matHeaderCellDef> ESTADO </th>
                                        <td mat-cell *matCellDef="let element">
                                    <span class="status-badge-pill" [ngClass]="element.statusClass">
                                        {{element.status}}
                                    </span>
                                        </td>
                                    </ng-container>

                                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                                </table>
                            </div>
                        </mat-card>

                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        /* Fondo General (Verde muy suave como en la imagen) */
        .profile-page {
            background-color: #F1F8E9; /* Tono verde pálido de fondo */
            min-height: 100vh;
            padding: 40px 20px;
        }

        .profile-container {
            max-width: 1200px;
            margin: 0 auto;
            font-family: 'Roboto', sans-serif;
        }

        /* Breadcrumbs */
        .breadcrumbs {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 32px;
            color: #558B2F; /* Verde oscuro */
            font-size: 0.95rem;
        }
        .back-link {
            display: flex;
            align-items: center;
            gap: 4px;
            text-decoration: none;
            color: #555;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.2s;
        }
        .back-link:hover { color: #2E7D32; }
        .separator { color: #aaa; }
        .current { color: #2E7D32; font-weight: 700; }

        /* Grid Layout */
        .profile-grid {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 40px;
            align-items: start;
        }

        /* --- IZQUIERDA --- */
        .identity-card {
            padding: 40px 24px;
            border-radius: 24px; /* Bordes más redondeados */
            box-shadow: 0 8px 30px rgba(0,0,0,0.04);
            text-align: center;
            background: white;
            margin-bottom: 32px;
            border: none;
        }

        .avatar-wrapper {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 24px;
            border: 4px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }

        .pet-name { margin: 0; font-size: 2.2rem; font-weight: 800; color: #1a1a1a; letter-spacing: -0.5px; }
        .pet-breed { margin: 8px 0 20px; color: #666; font-size: 1.1rem; }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: #E8F5E9; /* Verde muy claro */
            color: #2E7D32; /* Verde fuerte */
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 32px;
        }
        .status-badge mat-icon { font-size: 18px; width: 18px; height: 18px; }

        .edit-btn {
            width: 100%;
            border-radius: 12px;
            color: #666;
            border-color: #ddd;
            height: 44px;
        }

        .quick-facts-section h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 20px;
        }
        .fact-row {
            display: flex;
            justify-content: space-between;
            padding: 14px 0;
            border-bottom: 1px solid #e0e0e0;
            font-size: 0.95rem;
        }
        .fact-row:last-child { border-bottom: none; }
        .label { color: #888; font-weight: 400; }
        .value { color: #333; font-weight: 600; text-align: right; }

        /* --- DERECHA --- */
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        .section-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0;
            letter-spacing: -0.5px;
        }

        .share-btn {
            background-color: #4FC3F7; /* Azul cielo brillante como en la imagen */
            color: white;
            border-radius: 8px;
            font-weight: 700;
            padding: 0 24px;
            height: 42px;
            box-shadow: 0 4px 12px rgba(79, 195, 247, 0.3);
        }
        .delete-btn { color: #FF7043; margin-left: 8px; }

        /* Tabs */
        .profile-tabs { margin-bottom: 32px; }
        ::ng-deep .profile-tabs .mat-mdc-tab-link {
            font-family: 'Roboto', sans-serif;
            font-size: 1rem;
            color: #666;
            font-weight: 500;
        }
        ::ng-deep .profile-tabs .mdc-tab-indicator--active .mdc-tab-indicator__content {
            border-color: #2E7D32 !important; /* Subrayado verde */
            border-bottom-width: 3px;
        }
        ::ng-deep .profile-tabs .mdc-tab--active .mdc-tab__text-label {
            color: #2E7D32 !important;
        }

        /* Tarjeta de Tabla */
        .vaccine-table-card {
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            border: none;
            overflow: hidden;
            padding: 0;
        }

        .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 32px;
            background-color: white;
        }
        .table-header h3 { margin: 0; font-size: 1.3rem; font-weight: 700; color: #1a1a1a; }

        .register-btn {
            color: #3f51b5; /* Azul índigo similar a la imagen */
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-weight: 600;
            background: #f8f9fa;
        }

        /* Tabla */
        .table-responsive { overflow-x: auto; }
        .simple-table { width: 100%; }

        th.mat-header-cell {
            color: #9E9E9E;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            padding: 16px 24px;
            border-bottom: 1px solid #f0f0f0;
        }

        td.mat-cell {
            padding: 20px 24px;
            border-bottom: 1px solid #f5f5f5;
            font-size: 0.95rem;
            color: #444;
        }

        .vaccine-name { font-weight: 700; color: #2c3e50; font-size: 1rem; }

        /* Badges de Estado */
        .status-badge-pill {
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            display: inline-block;
            min-width: 80px;
            text-align: center;
        }
        .st-active { background-color: #E8F5E9; color: #2E7D32; } /* Verde */
        .st-soon { background-color: #FFF8E1; color: #FBC02D; }   /* Amarillo */
        .st-overdue { background-color: #FFEBEE; color: #D32F2F; } /* Rojo */

        @media (max-width: 960px) {
            .profile-grid { grid-template-columns: 1fr; gap: 24px; }
            .left-col { max-width: 100%; }
            .identity-card { display: flex; flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap; text-align: left; padding: 24px; }
            .avatar-wrapper { margin: 0 24px 0 0; }
            .identity-info { flex: 1; }
            .edit-btn { margin-top: 16px; width: auto; min-width: 120px; }
        }

        @media (max-width: 600px) {
            .identity-card { flex-direction: column; text-align: center; }
            .avatar-wrapper { margin: 0 auto 16px; }
            .section-header { flex-direction: column; align-items: flex-start; gap: 16px; }
            .header-actions { width: 100%; display: flex; justify-content: space-between; }
            .table-header { flex-direction: column; align-items: flex-start; gap: 16px; padding: 20px; }
        }
    `]
})
export class PetProfileComponent {
    displayedColumns: string[] = ['vaccine', 'date', 'expires', 'vet', 'status'];

    vaccines = [
        { vaccine: 'Rabies (1-year)', date: 'Aug 20, 2023', expires: 'Aug 20, 2024', vet: 'City Vet Clinic', status: 'Active', statusClass: 'st-active' },
        { vaccine: 'DHPP (Booster)', date: 'Jun 15, 2023', expires: 'Jun 15, 2024', vet: 'Dr. Emily Carter', status: 'Due Soon', statusClass: 'st-soon' },
        { vaccine: 'Bordetella', date: 'Dec 01, 2022', expires: 'Dec 01, 2023', vet: 'City Vet Clinic', status: 'Overdue', statusClass: 'st-overdue' },
        { vaccine: 'Leptospirosis', date: 'Aug 20, 2023', expires: 'Aug 20, 2024', vet: 'Dr. Emily Carter', status: 'Active', statusClass: 'st-active' }
    ];
}