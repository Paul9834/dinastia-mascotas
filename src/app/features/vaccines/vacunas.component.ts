import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs'; // Importante
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Para el modal

// Servicios y Modelos
import { PetApiService } from '../../core/services/pet-api.service';
import { VaccineService } from '../../core/services/vaccine.service';
import { Pet } from '../../core/models/pet.model';
import { Vaccine } from '../../core/models/vaccine.model';
import { VaccineDialogComponent } from '../../modules/components/vaccine-dialog/vaccine-dialog.component';

@Component({
    selector: 'app-vacunas',
    standalone: true,
    imports: [
        CommonModule, MatCardModule, MatButtonModule, MatIconModule,
        MatChipsModule, MatTabsModule, MatMenuModule, MatDialogModule
    ],
    templateUrl: './vacunas.component.html',
    styleUrls: ['./vacunas.component.scss']
})
export class VacunasComponent implements OnInit {
    private petService = inject(PetApiService);
    private vaccineService = inject(VaccineService);
    private dialog = inject(MatDialog);

    pets: Pet[] = [];
    selectedPetId: number | null = null;
    vaccines: Vaccine[] = []; // Datos reales del backend
    loading = false;

    ngOnInit() {
        this.loadPets();
    }

    // 1. Cargamos las mascotas para las pestañas
    loadPets() {
        this.petService.getMyPets().subscribe(pets => {
            this.pets = pets;
            if (this.pets.length > 0) {
                // Seleccionamos la primera por defecto
                this.selectedPetId = this.pets[0].id;
                this.loadVaccines(this.selectedPetId);
            }
        });
    }

    // 2. Cargamos vacunas cuando cambia la pestaña
    onTabChange(event: MatTabChangeEvent) {
        // El índice de la pestaña corresponde al índice en el array pets
        const pet = this.pets[event.index];
        if (pet) {
            this.selectedPetId = pet.id;
            this.loadVaccines(pet.id);
        }
    }

    // 3. Llamada al Backend
    loadVaccines(petId: number) {
        this.loading = true;
        this.vaccineService.getVaccinesByPet(petId).subscribe({
            next: (data) => {
                this.vaccines = data;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    // 4. Abrir Modal de Registro
    openRegisterDialog() {
        if (!this.selectedPetId) return;

        const dialogRef = this.dialog.open(VaccineDialogComponent, {
            width: '400px',
            data: { petId: this.selectedPetId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                // Si guardó exitosamente, recargamos la lista
                this.loadVaccines(this.selectedPetId!);
            }
        });
    }

    // --- Helpers Visuales ---

    getStatusClass(status: string): string {
        switch (status) {
            case 'ACTIVE': return 'status-active';
            case 'DUE_SOON': return 'status-due';
            case 'OVERDUE': return 'status-overdue';
            default: return '';
        }
    }

    translateStatus(status: string): string {
        switch (status) {
            case 'ACTIVE': return 'Vigente';
            case 'DUE_SOON': return 'Por Vencer';
            case 'OVERDUE': return 'Vencida';
            default: return status;
        }
    }
}