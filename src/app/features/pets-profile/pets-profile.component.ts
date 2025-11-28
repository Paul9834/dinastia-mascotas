import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
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
        MatMenuModule,
        RouterModule
    ],
    templateUrl: './pet-profile.component.html',
    styleUrl: './pet-profile.component.scss'
})
export class PetProfileComponent {
    displayedColumns: string[] = ['vaccine', 'date', 'expires', 'vet', 'status'];

    vaccines = [
        {
            vaccine: 'Rabies (1-year)',
            date: 'Aug 20, 2023',
            expires: 'Aug 20, 2024',
            vet: 'City Vet Clinic',
            status: 'Active',
            statusClass: 'st-active'
        },
        {
            vaccine: 'DHPP (Booster)',
            date: 'Jun 15, 2023',
            expires: 'Jun 15, 2024',
            vet: 'Dr. Emily Carter',
            status: 'Due Soon',
            statusClass: 'st-soon'
        },
        {
            vaccine: 'Bordetella',
            date: 'Dec 01, 2022',
            expires: 'Dec 01, 2023',
            vet: 'City Vet Clinic',
            status: 'Overdue',
            statusClass: 'st-overdue'
        },
        {
            vaccine: 'Leptospirosis',
            date: 'Aug 20, 2023',
            expires: 'Aug 20, 2024',
            vet: 'Dr. Emily Carter',
            status: 'Active',
            statusClass: 'st-active'
        }
    ];
}