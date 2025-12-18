import { Component, inject, viewChild, effect, computed } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GlobalSpinnerComponent } from '@shared/ui/spinner/global-spinner.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service'; // Ajusta la ruta a tu servicio

interface MenuItem {
    icon: string;
    label: string;
    route: string;
}

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        RouterModule,
        RouterLink,
        RouterLinkActive,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatBadgeModule,
        GlobalSpinnerComponent
    ],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

    private authService = inject(AuthService); // Inyectar servicio

    private breakpointObserver = inject(BreakpointObserver);

    // Referencia al componente visual
    sidenav = viewChild.required<MatSidenav>('sidenav');

    // 1. Detectar Móvil
    isMobile = toSignal(
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .pipe(map(result => result.matches)),
        { initialValue: false }
    );

    // 2. Modo Sidenav
    sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');

    // 3. Variable de control (Standard Boolean)
    isOpen = true;

    constructor() {
        // Sincronizar estado inicial al cargar o redimensionar
        effect(() => {
            this.isOpen = !this.isMobile();
        });
    }

    menuItems: MenuItem[] = [
        { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
        { icon: 'pets', label: 'Mis Mascotas', route: '/mascotas' },
        { icon: 'vaccines', label: 'Vacunas', route: '/vacunas' }];

    logout() {
        this.authService.logout();
    }
    // Botón hamburguesa
    toggleSidenav() {
        this.isOpen = !this.isOpen;
    }

    // 👇 ESTA ES LA FUNCIÓN QUE CIERRA AL HACER CLIC EN UN LINK 👇
    closeMenu() {
        if (this.isMobile()) {
            this.isOpen = false;
        }
    }
}