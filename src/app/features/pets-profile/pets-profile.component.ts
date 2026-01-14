import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { VaccineService } from '../../core/services/vaccine.service';
import { Vaccine } from '../../core/models/vaccine.model';
import { PetApiService } from '@core/services/pet-api.service';
import { Pet } from '@core/models/pet.model';

@Component({
    selector: 'app-pet-profile',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatChipsModule,
        MatMenuModule
    ],
    templateUrl: './pet-profile.component.html',
    styleUrl: './pet-profile.component.scss'
})
export class PetProfileComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private vaccineService = inject(VaccineService);
    private petService = inject(PetApiService);
    private sanitizer = inject(DomSanitizer);

    displayedColumns: string[] = ['vaccine', 'date', 'expires', 'vet', 'status'];

    pet: Pet | null = null;
    vaccines: Vaccine[] = [];
    petId: number | null = null;
    loading = true;

    pdfUrl: SafeResourceUrl | null = null;
    private pdfObjectUrl: string | null = null;
    pdfLoading = false;
    pdfError: string | null = null;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const idString = params.get('id');
            if (idString) {
                this.petId = +idString;
                this.loadData(this.petId);
            }
        });
    }

    loadData(id: number) {
        this.loading = true;

        this.petService.getPetById(id).subscribe({
            next: (data) => (this.pet = data),
            error: (err) => console.error('Error cargando mascota:', err)
        });

        this.vaccineService.getVaccinesByPet(id).subscribe({
            next: (data) => {
                this.vaccines = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error cargando vacunas:', err);
                this.loading = false;
            }
        });

        this.pdfLoading = true;
        this.pdfError = null;

        this.petService.getCarnetPdf(id).subscribe({
            next: (blob) => {
                if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);

                this.pdfObjectUrl = URL.createObjectURL(
                    new Blob([blob], { type: 'application/pdf' })
                );

                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfObjectUrl);
                this.pdfLoading = false;
            },
            error: (err) => {
                console.error('Error cargando carnet PDF:', err);
                this.pdfError = 'No se pudo cargar el carnet.';
                this.pdfLoading = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'ACTIVE': return 'st-active';
            case 'DUE_SOON': return 'st-soon';
            case 'OVERDUE': return 'st-overdue';
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