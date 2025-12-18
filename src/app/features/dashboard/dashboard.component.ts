import { Component, HostListener, OnInit, inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations'; // 👈 IMPORTANTE

import { AuthService } from '../../core/services/auth.service';
import { Pet } from '../../core/models/pet.model';
import { PetApiService } from '../../core/services/pet-api.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { Appointment } from '../../core/models/appointment.model';
import { AgePipe } from '../../shared/pipes/age.pipe';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        AgePipe
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    // 👇👇👇 AQUI ESTÁ LA MAGIA DE LAS ANIMACIONES 👇👇👇
    animations: [
        // Animación 1: Entrada suave hacia arriba (Header)
        trigger('fadeInUp', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('600ms cubic-bezier(0.2, 0.0, 0, 1.0)', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        // Animación 2: Lista escalonada (Tarjetas entran una por una)
        trigger('staggerList', [
            transition('* => *', [ // Cada vez que cambian los datos
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(30px)' }),
                    stagger('100ms', [ // Retraso de 100ms entre cada item
                        animate('500ms cubic-bezier(0.2, 0.0, 0, 1.0)',
                            style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class DashboardComponent implements OnInit {
    // ... (Tu código TypeScript sigue EXACTAMENTE IGUAL, no borres nada de la lógica) ...
    // Solo asegúrate de copiar la sección `animations` y los imports de arriba.

    private authService = inject(AuthService);
    private petApiService = inject(PetApiService);
    private appointmentService = inject(AppointmentService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

    mobileQuery = false;
    stats = [
        { icon: 'event', label: 'Citas Pendientes', value: '0', color: '#ff9800' },
        { icon: 'vaccines', label: 'Total Citas', value: '0', color: '#1B5E20' }
    ];

    mascotas: Pet[] = [];
    appointments: Appointment[] = [];
    fallbackImage = 'assets/avatar-placeholder.png';

    get canGoBack(): boolean {
        return this.carouselTrack ? this.carouselTrack.nativeElement.scrollLeft > 0 : false;
    }

    get canGoForward(): boolean {
        if (!this.carouselTrack) return false;
        const { scrollLeft, scrollWidth, clientWidth } = this.carouselTrack.nativeElement;
        return scrollLeft + clientWidth < scrollWidth - 1;
    }

    ngOnInit() {
        this.checkScreenSize();
        this.loadPets();
        this.loadAppointments();
    }

    loadPets() {
        this.petApiService.getMyPets().subscribe({
            next: (pets) => {
                this.mascotas = pets;
                this.cdr.detectChanges();
            },
            error: (err) => console.error('Error cargando mascotas', err)
        });
    }

    loadAppointments() {
        this.appointmentService.getMyAppointments().subscribe({
            next: (data) => {
                this.appointments = data.sort((a, b) =>
                    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
                );
                const pendientes = data.filter(a => a.status === 'PENDING').length;
                this.stats[0].value = pendientes.toString();
                this.stats[1].value = data.length.toString();
            }
        });
    }

    scrollLeft() {
        this.carouselTrack.nativeElement.scrollBy({ left: -320, behavior: 'smooth' });
    }

    scrollRight() {
        this.carouselTrack.nativeElement.scrollBy({ left: 320, behavior: 'smooth' });
    }

    verDetalle(pet: Pet) {
        this.router.navigate(['/mascotas', pet.id]);
    }

    cerrarSesion() {
        this.authService.logout();
    }

    @HostListener('window:resize')
    onResize() {
        this.checkScreenSize();
    }

    checkScreenSize() {
        this.mobileQuery = window.innerWidth < 768;
    }

    getIconForType(type: string): string {
        const icons: any = { 'VACCINATION': 'vaccines', 'CHECKUP': 'medical_services', 'SURGERY': 'local_hospital', 'GROOMING': 'content_cut' };
        return icons[type] || 'event';
    }

    getColorForType(type: string): string {
        const colors: any = { 'VACCINATION': '#1B5E20', 'CHECKUP': '#1976D2', 'SURGERY': '#C62828', 'GROOMING': '#FBC02D' };
        return colors[type] || '#757575';
    }

    translateStatus(status: string): string {
        const map: any = { 'PENDING': 'Pendiente', 'COMPLETED': 'Completada', 'CANCELLED': 'Cancelada' };
        return map[status] || status;
    }

    getStatusClass(status: string): string {
        return status === 'PENDING' ? 'upcoming' : status === 'CANCELLED' ? 'overdue' : '';
    }
}