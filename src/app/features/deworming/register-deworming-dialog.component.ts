import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-register-deworming-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    template: `
    <h2 mat-dialog-title>Registrar desparasitación</h2>

    <div mat-dialog-content>
      <mat-form-field style="width:100%">
        <mat-label>Producto</mat-label>
        <input matInput [(ngModel)]="product">
      </mat-form-field>

        <div class="days-group">
            <span class="days-label">Dias de aplicacion</span>
            <div class="days-options">
                <mat-checkbox [checked]="selectedDays === 1" (change)="selectDays(1, $event.checked)">1 día</mat-checkbox>
                <mat-checkbox [checked]="selectedDays === 2" (change)="selectDays(2, $event.checked)">2 días</mat-checkbox>
                <mat-checkbox [checked]="selectedDays === 3" (change)="selectDays(3, $event.checked)">3 días</mat-checkbox>
            </div>
        </div>

      <mat-form-field style="width:100%">
        <mat-label>Fecha de aplicación</mat-label>
        <input matInput [matDatepicker]="applicationPicker" [(ngModel)]="applicationDate">
        <mat-datepicker-toggle matIconSuffix [for]="applicationPicker"></mat-datepicker-toggle>
        <mat-datepicker #applicationPicker></mat-datepicker>
      </mat-form-field>


        <mat-form-field style="width:100%">
            <mat-label>Proxima aplicación</mat-label>
            <input matInput [matDatepicker]="applicationPicker" [(ngModel)]="applicationDate">
            <mat-datepicker-toggle matIconSuffix [for]="applicationPicker"></mat-datepicker-toggle>
            <mat-datepicker #applicationPicker></mat-datepicker>
        </mat-form-field>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()">Guardar</button>
    </div>
  `,
    styles: [`
      .days-group { margin: 4px 0 12px; }
      .days-label { display: block; font-size: 12px; color: rgba(0,0,0,0.6); margin-bottom: 6px; }
      .days-options { display: flex; gap: 12px; flex-wrap: wrap; }
    `]
})
export class RegisterDewormingDialogComponent {

    private dialogRef = inject(MatDialogRef<RegisterDewormingDialogComponent>);
    data = inject(MAT_DIALOG_DATA);

    product = '';
    applicationDate: Date | null = new Date();
    selectedDays: number | null = null;
    notes = '';

    close() {
        this.dialogRef.close();
    }

    selectDays(days: number, checked: boolean) {
        this.selectedDays = checked ? days : null;
    }

    save() {
        this.dialogRef.close({
            product: this.product,
            applicationDate: this.applicationDate,
            nextDueInDays: this.selectedDays,
            notes: this.notes,
            petId: this.data.petId
        });
    }
}
