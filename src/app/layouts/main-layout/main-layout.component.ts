import { Component, HostListener, OnInit } from '@angular/core';

import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { GlobalSpinnerComponent } from '@shared//ui/spinner/global-spinner.component';

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
export class MainLayoutComponent implements OnInit {
    mobileQuery = false;
    sidenavMode: 'side' | 'over' = 'side';
    isSidenavOpen = true;

    menuItems: MenuItem[] = [
        { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
        { icon: 'pets', label: 'Mis Mascotas', route: '/mascotas' },
        { icon: 'vaccines', label: 'Vacunas', route: '/vacunas' },
        { icon: 'event', label: 'Calendario', route: '/calendario' },
        { icon: 'settings', label: 'Configuración', route: '/configuracion' }
    ];

    ngOnInit() {
        this.checkScreenSize();
    }

    @HostListener('window:resize')
    onResize() {
        this.checkScreenSize();
    }

    checkScreenSize() {
        const width = window.innerWidth;

        if (width < 768) {
            this.mobileQuery = true;
            this.sidenavMode = 'over';
            this.isSidenavOpen = false;
        } else {
            this.mobileQuery = false;
            this.sidenavMode = 'side';
            this.isSidenavOpen = true;
        }
    }

    closeSidenavOnMobile() {
        if (this.mobileQuery) this.isSidenavOpen = false;
    }
}
