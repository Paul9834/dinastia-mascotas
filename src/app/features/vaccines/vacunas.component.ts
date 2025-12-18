import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// MatCardModule ya no es esencial en el HTML pero lo mantenemos por si usas directivas
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { PetApiService } from '../../core/services/pet-api.service';
import { VaccineService } from '../../core/services/vaccine.service';
import { Pet } from '../../core/models/pet.model';
import { Vaccine } from '../../core/models/vaccine.model';
// Asegúrate de que este path sea correcto
import { VaccineDialogComponent } from '../../modules/components/vaccine-dialog/vaccine-dialog.component';

@Component({
    selector: 'app-vacunas',
    standalone: true,
    imports: [
        CommonModule, MatCardModule, MatButtonModule, MatIconModule,
        MatTabsModule, MatMenuModule, MatDialogModule
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
    vaccines: Vaccine[] = [];
    loading = false;

    ngOnInit() {
        this.loadPets();
    }

    loadPets() {
        this.petService.getMyPets().subscribe(pets => {
            this.pets = pets;
            if (this.pets.length > 0) {
                this.selectedPetId = this.pets[0].id;
                this.loadVaccines(this.selectedPetId);
            }
        });
    }

    onTabChange(event: MatTabChangeEvent) {
        const pet = this.pets[event.index];
        if (pet) {
            this.selectedPetId = pet.id;
            this.loadVaccines(pet.id);
        }
    }

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

    openRegisterDialog() {
        if (!this.selectedPetId) return;

        const dialogRef = this.dialog.open(VaccineDialogComponent, {
            width: '450px', // Un poco más ancho para que se vea bien
            data: { petId: this.selectedPetId },
            panelClass: 'custom-dialog-container' // Puedes añadir estilos globales si quieres
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
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