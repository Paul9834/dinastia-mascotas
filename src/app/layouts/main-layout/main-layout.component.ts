import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

interface MenuItem {
    icon: string;
    label: string;
    route: string;
}

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        RouterLink,
        RouterLinkActive,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatBadgeModule
    ],
    template: `
        <mat-sidenav-container class="sidenav-container">

            <!-- SIDENAV (Menú Lateral) -->
            <mat-sidenav #sidenav
                         [mode]="sidenavMode"
                         [opened]="isSidenavOpen"
                         class="app-sidenav"
                         [fixedInViewport]="mobileQuery"
                         [fixedTopGap]="0">

                <div class="sidenav-content-wrapper">
                    <!-- Logo -->
                    <div class="logo-container">
                        <mat-icon class="logo-icon">pets</mat-icon>
                        <h2 class="logo-text">Dinastía Mascotas</h2>
                    </div>

                    <!-- Menú Dinámico desde Array -->
                    <mat-nav-list>
                        <a mat-list-item
                           *ngFor="let item of menuItems"
                           [routerLink]="item.route"
                           routerLinkActive="active-link"
                           (click)="closeSidenavOnMobile()"
                           class="nav-item">
                            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                            <span matListItemTitle>{{ item.label }}</span>
                        </a>
                    </mat-nav-list>

                    <div class="spacer"></div>

                    <!-- Perfil Usuario -->
                    <div class="user-profile">
                        <mat-icon class="avatar-icon">account_circle</mat-icon>
                        <div class="user-info">
                            <div class="user-name">Alex SEO</div>
                            <div class="user-email">admin&#64;dinastia.co</div>
                        </div>
                    </div>
                </div>
            </mat-sidenav>

            <!-- CONTENIDO PRINCIPAL -->
            <mat-sidenav-content class="main-content">

                <!-- Toolbar Superior (Color Personalizado Verde) -->
                <mat-toolbar class="app-toolbar">
                    <!-- Botón Hamburguesa (Solo visible en Móvil) -->
                    <button mat-icon-button (click)="sidenav.toggle()" *ngIf="mobileQuery" class="menu-btn">
                        <mat-icon>menu</mat-icon>
                    </button>

                    <!-- Título (Visible en móvil o si quieres siempre) -->
                    <span *ngIf="mobileQuery">Dinastía Mascotas</span>

                    <span class="toolbar-spacer"></span>

                    <!-- Botones de Acción (Notificaciones y Perfil) -->
                    <button mat-icon-button matBadge="3" matBadgeColor="warn">
                        <mat-icon>notifications</mat-icon>
                    </button>

                    <button mat-icon-button>
                        <mat-icon>account_circle</mat-icon>
                    </button>
                </mat-toolbar>

                <!-- Aquí se cargan las páginas -->
                <div class="content-wrapper">
                    <router-outlet></router-outlet>
                </div>

            </mat-sidenav-content>

        </mat-sidenav-container>
    `,
    styles: [`
        .sidenav-container {
            width: 100%;
            height: 100vh;
        }

        /* --- ESTILOS SIDENAV --- */
        .app-sidenav {
            width: 260px;
            background: white;
            border-right: 1px solid rgba(0,0,0,0.08);
        }

        .sidenav-content-wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        /* Logo (Verde Salud) */
        .logo-container {
            padding: 24px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            color: #2E7D32; /* Verde Oscuro */
        }
        .logo-icon { font-size: 28px; width: 28px; height: 28px; }
        .logo-text { margin: 0; font-size: 1.2rem; font-weight: 700; }

        /* Navegación */
        .nav-item {
            margin: 4px 12px;
            border-radius: 8px;
            color: #555;
        }

        /* Clase activa aplicada por routerLinkActive (Verde) */
        .active-link {
            background-color: rgba(46, 125, 50, 0.12); /* Verde suave transparente */
            color: #2E7D32; /* Verde principal */
            font-weight: 600;
        }
        .active-link mat-icon { color: #2E7D32; }

        .spacer { flex: 1; }

        /* Perfil */
        .user-profile {
            padding: 16px 20px;
            border-top: 1px solid rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            gap: 12px;
            background-color: #fafafa;
        }
        .avatar-icon {
            font-size: 40px;
            width: 40px;
            height: 40px;
            color: #81C784; /* Verde claro para avatar */
        }
        .user-info { overflow: hidden; }
        .user-name { font-weight: 600; font-size: 0.9rem; color: #333; }
        .user-email { font-size: 0.8rem; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* --- CONTENIDO --- */
        .main-content {
            display: flex;
            flex-direction: column;
            background-color: #f1f8e9; /* Fondo muy suave verdoso para la app */
        }

        .app-toolbar {
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            background-color: #2E7D32; /* Verde Salud Principal */
            color: white;
        }

        /* Asegurar que los botones en la toolbar blanca se vean bien */
        .app-toolbar button { color: white; }

        .toolbar-spacer { flex: 1; }

        .content-wrapper {
            padding: 0;
            flex: 1;
            overflow-y: auto;
        }
    `]
})
export class MainLayoutComponent implements OnInit {

    mobileQuery = false;
    sidenavMode: 'side' | 'over' = 'side';
    isSidenavOpen = true;

    // Menú con las rutas corregidas + VACUNAS agregado
    menuItems: MenuItem[] = [
        { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
        { icon: 'pets', label: 'Mis Mascotas', route: '/mascotas' },
        { icon: 'vaccines', label: 'Vacunas', route: '/vacunas' }, // Nueva opción agregada
        { icon: 'event', label: 'Calendario', route: '/calendario' },
        { icon: 'settings', label: 'Configuración', route: '/configuracion' }
    ];

    ngOnInit() {
        this.checkScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
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
        if (this.mobileQuery) {
            this.isSidenavOpen = false;
        }
    }
}