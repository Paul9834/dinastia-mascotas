import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../core/services/auth.service';
import { Pet } from '../../core/models/pet.model';
import { PetApiService } from '../../core/services/pet-api.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { Appointment } from '../../core/models/appointment.model';
// 1. IMPORTAR EL PIPE
import { AgePipe } from '../../shared/pipes/age.pipe';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    // ... (El resto de tus inyecciones y variables sigue igual) ...
    private authService = inject(AuthService);
    private petApiService = inject(PetApiService);
    private appointmentService = inject(AppointmentService);

    mobileQuery = false;
    stats = [
        { icon: 'event', label: 'Citas Pendientes', value: '0', color: '#ff9800' },
        { icon: 'vaccines', label: 'Total Citas', value: '0', color: '#4caf50' }
    ];
    mascotas: Pet[] = [];
    appointments: Appointment[] = [];
    currentIndex = 0;
    visibleCards = 4;
    fallbackImage = 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=500&fit=crop';

    ngOnInit() {
        this.checkScreenSize();
        this.loadPets();
        this.loadAppointments();
    }

    // ... (loadPets y loadAppointments siguen igual) ...

    loadPets() {
        this.petApiService.getMyPets().subscribe({
            next: (pets) => {
                this.mascotas = pets;
                this.validateIndex();
            }
        });
    }

    loadAppointments() {
        this.appointmentService.getMyAppointments().subscribe({
            next: (data) => {
                this.appointments = data;
                const pendientes = data.filter(a => a.status === 'PENDING').length;
                this.stats[0].value = pendientes.toString();
                this.stats[1].value = data.length.toString();
            },
            error: (err) => console.error('Error cargando citas', err)
        });
    }

    // 3. NUEVA FUNCIÓN PARA DETECTAR CUMPLEAÑOS
    isBirthday(dateString: string | Date | undefined): boolean {
        if (!dateString) return false;

        // Convertimos a fechas reales para comparar solo día y mes
        // Agregamos "T00:00:00" si es string simple para evitar problemas de zona horaria
        const dateStr = dateString.toString();
        const birth = new Date(dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00');
        const today = new Date();

        return today.getDate() === birth.getDate() &&
            today.getMonth() === birth.getMonth();
    }

    // ... (Tus helpers getIconForType, getColorForType, etc. siguen igual) ...
    getIconForType(type: string): string { /* ... */ return 'event'; } // (abreviado para no repetir)
    getColorForType(type: string): string { /* ... */ return '#9e9e9e'; }
    translateStatus(status: string): string { /* ... */ return status; }
    getStatusClass(status: string): string { return status.toLowerCase(); }
    cerrarSesion() { this.authService.logout(); }

    @HostListener('window:resize')
    onResize() { this.checkScreenSize(); }

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

    get canGoBack() { return this.currentIndex > 0; }
    get canGoForward() { return this.currentIndex + this.visibleCards < this.mascotas.length; }
    scrollLeft() { if (this.canGoBack) this.currentIndex--; }
    scrollRight() { if (this.canGoForward) this.currentIndex++; }
}