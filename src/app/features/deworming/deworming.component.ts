import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { PetApiService } from '../../core/services/pet-api.service';
import { Pet } from '../../core/models/pet.model';
import {CreateDeworming, DewormingService} from '../../core/services/deworming.service';
import { RegisterDewormingDialogComponent } from './register-deworming-dialog.component';

interface Deworming {
    id: number;
    productName: string;
    applicationDate: string;
    nextDueDate?: string;
    veterinarian?: string;
    status: 'ACTIVE' | 'DUE_SOON' | 'OVERDUE';
    type?: string;
}

@Component({
    selector: 'app-deworming',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatDialogModule
    ],
    templateUrl: './deworming.component.html',
    styleUrls: ['./deworming.component.scss']
})
export class DewormingComponent implements OnInit {

    private petService = inject(PetApiService);
    private dewormingService = inject(DewormingService);
    private dialog = inject(MatDialog);

    pets: Pet[] = [];
    selectedPetId: number | null = null;
    dewormings: Deworming[] = [];
    loading = false;

    ngOnInit() {
        this.loadPets();
    }

    loadPets() {
        this.petService.getMyPets().subscribe(pets => {
            this.pets = pets;
            if (this.pets.length > 0) {
                this.selectedPetId = this.pets[0].id;
                this.loadDewormings(this.selectedPetId);
            }
        });
    }

    onTabChange(event: MatTabChangeEvent) {
        const pet = this.pets[event.index];
        if (pet) {
            this.selectedPetId = pet.id;
            this.loadDewormings(pet.id);
        }
    }

    calculateStatus(nextDueDate?: string): 'ACTIVE' | 'DUE_SOON' | 'OVERDUE' {
        if (!nextDueDate) return 'ACTIVE';

        const today = new Date();
        const due = new Date(nextDueDate);

        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'OVERDUE';
        if (diffDays <= 15) return 'DUE_SOON';
        return 'ACTIVE';
    }

    loadDewormings(petId: number) {
        this.loading = true;

        this.dewormingService.getByPet(petId).subscribe({
            next: (data) => {
                this.dewormings = data.map(d => ({
                    id: d.id,
                    productName: d.product,
                    applicationDate: d.applicationDate,
                    nextDueDate: d.nextDueDate,
                    veterinarian: d.veterinarian,
                    type: d.method,
                    status: this.calculateStatus(d.nextDueDate)
                }));
                this.loading = false;
            },
            error: () => {
                this.dewormings = [];
                this.loading = false;
            }
        });
    }

    edit(id: number) {
        console.log('Editar desparasitación', id);
    }

    delete(id: number) {
        this.dewormingService.delete(id).subscribe(() => {
            if (this.selectedPetId) {
                this.loadDewormings(this.selectedPetId);
            }
        });
    }

    openRegisterDialog() {
        if (!this.selectedPetId) return;

        const dialogRef = this.dialog.open(RegisterDewormingDialogComponent, {
            width: '520px',
            data: { petId: this.selectedPetId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;

            const applicationDate = result.applicationDate instanceof Date ? result.applicationDate : new Date();
            const applicationDateStr = this.formatDateLocal(applicationDate);
            const nextDueDate = result.nextDueInDays
                ? this.addDays(applicationDate, result.nextDueInDays)
                : null;

            const payload: CreateDeworming = {
                petId: this.selectedPetId!,
                product: result.product,
                method: 'Interno',
                applicationDate: applicationDateStr,
                nextDueDate,
                notes: result.notes ? result.notes : null,
                verified: true
            };

            this.dewormingService.create(payload).subscribe(() => {
                this.loadDewormings(this.selectedPetId!);
            });
        });
    }

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
            case 'OVERDUE': return 'Vencido';
            default: return status;
        }
    }

    private formatDateLocal(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private addDays(date: Date, days: number): string {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return this.formatDateLocal(result);
    }
}
