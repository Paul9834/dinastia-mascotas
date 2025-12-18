import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    private titleService = inject(Title);
    private metaService = inject(Meta);
    private router = inject(Router);

    ngOnInit() {
        this.titleService.setTitle('Dinastía Mascotas | Cuidado y Legado');
        this.metaService.updateTag({ name: 'description', content: 'Gestión integral de salud, certificado de autenticidad y comunidad exclusiva para tu mascota Dinastía.' });
    }

    irALogin() {
        this.router.navigate(['/login']);
    }

    irARegistro() {
        this.router.navigate(['/registro']);
    }

    // Datos Nature UI (Gradientes Verdes y Frescos)
    trustFeatures = [
        {
            title: 'Genética Certificada',
            desc: 'Trazabilidad completa del linaje y pureza de raza garantizada.',
            icon: 'verified_user',
            // Verde Bosque a Esmeralda
            bg: 'linear-gradient(135deg, #1B5E20 0%, #43A047 100%)'
        },
        {
            title: 'Salud Blindada',
            desc: 'Protocolo de vacunación premium aplicado por especialistas.',
            icon: 'health_and_safety',
            // Verde Lima a Menta (Salud)
            bg: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)'
        },
        {
            title: 'Identidad Global',
            desc: 'Microchip ISO homologado para viajes internacionales.',
            icon: 'public',
            // Verde Azulado (Mundo)
            bg: 'linear-gradient(135deg, #00695C 0%, #26A69A 100%)'
        }
    ];
}