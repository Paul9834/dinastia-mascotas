import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PetApiService } from '@core/services/pet-api.service';
import { UploadService } from '@core/services/upload.service';
import { CreatePetForm } from '@core/models/pet.model';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-anadir-mascota',
    standalone: true,
    templateUrl: './anadir-mascota.component.html',
    styleUrls: ['./anadir-mascota.component.scss'],
    imports: [
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
]
})
export class AnadirMascotaComponent {

    private petApiService = inject(PetApiService);
    private uploadService = inject(UploadService);
    private router = inject(Router);

    petForm: CreatePetForm = {
        name: '',
        species: '',
        breed: null,
        sex: null,
        birthDate: null,
        photoUrl: null
    };



    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];

        this.uploadService.uploadPetPhoto(file).subscribe({
            next: (res) => {
                // TRUCO: Quitamos el "/api" de la URL base para las fotos
                const serverUrl = environment.apiBaseUrl.replace('/api', '');

                // Ahora queda: "http://190.24.6.141:9090" + "/uploads/..."
                this.petForm.photoUrl = `${serverUrl}${res.url}`;
            },
            error: (err) => console.error(err)
        });
    }

    guardarMascota() {
        const payload = {
            name: this.petForm.name,
            species: this.petForm.species,
            breed: this.petForm.breed ?? null,
            sex: this.petForm.sex
                ? this.petForm.sex.toUpperCase() as 'MALE' | 'FEMALE'
                : null,
            birthDate: this.petForm.birthDate
                ? this.petForm.birthDate.toISOString().split('T')[0]
                : null,
            photoUrl: this.petForm.photoUrl ?? null,
            color: null
        };

        this.petApiService.createPet(payload).subscribe({
            next: () => this.router.navigate(['/mascotas']),
            error: err => console.error('Error al crear mascota', err)
        });
    }
}
