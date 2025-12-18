import { Component, OnInit, inject } from '@angular/core'; // <--- Importar OnInit e inject
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, ActivatedRoute } from '@angular/router'; // <--- Importar ActivatedRoute
import { VaccineService } from '../../core/services/vaccine.service';
import { Vaccine } from '../../core/models/vaccine.model';
import {PetApiService} from "@core/services/pet-api.service";
import {Pet} from "@core/models/pet.model";

@Component({
    selector: 'app-pet-profile',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule, // Necesario para el routerLink del HTML
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
export class PetProfileComponent implements OnInit {

    // --- Inyecciones de Dependencias ---
    private route = inject(ActivatedRoute);
    private vaccineService = inject(VaccineService);
    private petService = inject(PetApiService); // Servicio para datos de la mascota

    // --- Configuración de Tabla ---
    displayedColumns: string[] = ['vaccine', 'date', 'expires', 'vet', 'status'];

    // --- Datos ---
    pet: Pet | null = null; // Objeto para la info de la izquierda (Foto, Nombre, Raza)
    vaccines: Vaccine[] = []; // Lista para la tabla derecha
    petId: number | null = null;
    loading = true;

    ngOnInit() {
        // Escuchamos cambios en la URL (ej: /pets/5)
        this.route.paramMap.subscribe(params => {
            const idString = params.get('id');
            if (idString) {
                this.petId = +idString; // Convertir string a número
                this.loadData(this.petId);
            }
        });
    }

    // Carga centralizada de datos
    loadData(id: number) {
        this.loading = true;

        // 1. Cargar datos de la Mascota (Para la tarjeta de identidad)
        this.petService.getPetById(id).subscribe({
            next: (data) => {
                this.pet = data;
            },
            error: (err) => console.error('Error cargando mascota:', err)
        });

        // 2. Cargar Vacunas (Para la tabla)
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
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'ACTIVE': return 'st-active';
            case 'DUE_SOON': return 'st-soon';
            case 'OVERDUE': return 'st-overdue';
            default: return ''; // O una clase por defecto
        }
    }

    // Traduce el texto del estado al español
    translateStatus(status: string): string {
        switch (status) {
            case 'ACTIVE': return 'Vigente';
            case 'DUE_SOON': return 'Por Vencer';
            case 'OVERDUE': return 'Vencida';
            default: return status;
        }
    }
}