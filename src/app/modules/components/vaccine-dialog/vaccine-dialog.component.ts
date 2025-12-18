import { Component, Inject, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VaccineService } from '@core/services/vaccine.service';

@Component({
    selector: 'app-vaccine-dialog',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
],
    template: `
    <h2 mat-dialog-title>Registrar Vacuna</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-dialog-content class="form-content">
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre de la Vacuna</mat-label>
          <input matInput formControlName="name" placeholder="Ej: Rabia">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Veterinario / Clínica</mat-label>
          <input matInput formControlName="veterinarian" placeholder="Ej: City Vet">
        </mat-form-field>

        <div class="dates-row">
          <mat-form-field appearance="outline">
            <mat-label>Fecha Aplicación</mat-label>
            <input matInput [matDatepicker]="picker1" formControlName="applicationDate">
            <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
            <mat-datepicker #picker1></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Próxima Dosis (Vence)</mat-label>
            <input matInput [matDatepicker]="picker2" formControlName="nextDueDate">
            <mat-datepicker-toggle matIconSuffix [for]="picker2"></mat-datepicker-toggle>
            <mat-datepicker #picker2></mat-datepicker>
          </mat-form-field>
        </div>

      </mat-dialog-content>
      
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
      </mat-dialog-actions>
    </form>
  `,
    styles: [`
    .form-content { display: flex; flex-direction: column; gap: 12px; min-width: 350px; }
    .full-width { width: 100%; }
    .dates-row { display: flex; gap: 12px; }
  `]
})
export class VaccineDialogComponent {
    private fb = inject(FormBuilder);
    private vaccineService = inject(VaccineService);
    private dialogRef = inject(MatDialogRef<VaccineDialogComponent>);

    // Recibimos el ID de la mascota seleccionada
    public data: { petId: number } = inject(MAT_DIALOG_DATA);

    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        veterinarian: [''],
        applicationDate: [new Date(), Validators.required],
        nextDueDate: [null]
    });

    save() {
        if (this.form.valid) {
            const payload = {
                ...this.form.value,
                petId: this.data.petId,
                // Convertimos fechas de JS a String YYYY-MM-DD para Spring Boot
                applicationDate: this.formatDate(this.form.value.applicationDate),
                nextDueDate: this.form.value.nextDueDate ? this.formatDate(this.form.value.nextDueDate) : null
            };

            this.vaccineService.createVaccine(payload).subscribe({
                next: (res) => this.dialogRef.close(true), // Cerramos y avisamos que se guardó
                error: (err) => console.error(err)
            });
        }
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}