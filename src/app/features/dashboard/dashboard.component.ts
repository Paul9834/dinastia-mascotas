import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../core/services/auth.service';
import { Pet } from '../../core/models/pet.model';
import { PetApiService } from '../../core/services/pet-api.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private authService = inject(AuthService);
    private petApiService = inject(PetApiService);

    mobileQuery = false;

    stats = [
        { icon: 'event', label: 'Citas Pendientes', value: '5', color: '#ff9800' },
        { icon: 'vaccines', label: 'Vacunas', value: '2', color: '#4caf50' }
    ];

    appointments = [
        {
            title: 'Vacuna Anual Rabia',
            pet: 'Fido (Golden Retriever)',
            date: 'Oct 25, 2024',
            status: 'upcoming',
            statusText: 'En 2 semanas',
            icon: 'vaccines',
            iconColor: '#ff9800'
        },
        {
            title: 'Chequeo General',
            pet: 'Luna (Gato Siamés)',
            date: 'Nov 5, 2024',
            status: 'overdue',
            statusText: 'Vencido',
            icon: 'medical_services',
            iconColor: '#f44336'
        }
    ];

    mascotas: Pet[] = [];

    currentIndex = 0;
    visibleCards = 4;

    fallbackImage = 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=500&fit=crop';

    ngOnInit() {
        this.checkScreenSize();
        this.loadPets();
    }

    loadPets() {
        this.petApiService.getMyPets().subscribe({
            next: (pets) => {
                this.mascotas = pets;
                this.validateIndex();
            }
        });
    }

    cerrarSesion() {
        this.authService.logout();
    }

    @HostListener('window:resize')
    onResize() {
        this.checkScreenSize();
    }

    checkScreenSize() {
        const width = window.innerWidth;
        this.mobileQuery = width < 768;

        if (width < 768) this.visibleCards = 1;
        else if (width < 1280) this.visibleCards = 2;
        else this.visibleCards = 4;

        this.validateIndex();
    }

    validateIndex() {
        if (this.currentIndex + this.visibleCards > this.mascotas.length) {
            this.currentIndex = Math.max(0, this.mascotas.length - this.visibleCards);
        }
    }

    get visibleMascotas() {
        return this.mascotas.slice(this.currentIndex, this.currentIndex + this.visibleCards);
    }

    get canGoBack() {
        return this.currentIndex > 0;
    }

    get canGoForward() {
        return this.currentIndex + this.visibleCards < this.mascotas.length;
    }

    scrollLeft() {
        if (this.canGoBack) this.currentIndex--;
    }

    scrollRight() {
        if (this.canGoForward) this.currentIndex++;
    }
}
