import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-register-deworming-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ],
    template: `
    <h2 mat-dialog-title>Registrar desparasitación</h2>

    <div mat-dialog-content>
      <mat-form-field style="width:100%">
        <mat-label>Producto</mat-label>
        <input matInput [(ngModel)]="product">
      </mat-form-field>

      <mat-form-field style="width:100%">
        <mat-label>Veterinario</mat-label>
        <input matInput [(ngModel)]="veterinarian">
      </mat-form-field>

    <mat-form-field style="width:100%">
        <mat-label>Próxima dosis</mat-label>
        <input matInput type="date" [(ngModel)]="nextDueDate">
    </mat-form-field>

    <mat-form-field style="width:100%">
        <mat-label>Notas</mat-label>
        <input matInput [(ngModel)]="notes">
    </mat-form-field>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()">Guardar</button>
    </div>
  `
})
export class RegisterDewormingDialogComponent {

    private dialogRef = inject(MatDialogRef<RegisterDewormingDialogComponent>);
    data = inject(MAT_DIALOG_DATA);

    product = '';
    veterinarian = '';
    notes = '';
    nextDueDate: string | null = null;

    close() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close({
            product: this.product,
            veterinarian: this.veterinarian,
            notes: this.notes,
            nextDueDate: this.nextDueDate,
            petId: this.data.petId
        });
    }
}