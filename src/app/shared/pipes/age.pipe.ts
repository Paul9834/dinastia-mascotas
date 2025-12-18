import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'age',
    standalone: true
})
export class AgePipe implements PipeTransform {

    transform(birthDate: string | Date | undefined): string {
        if (!birthDate) return 'Edad desconocida';

        const today = new Date();
        const birth = new Date(birthDate);

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();

        if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
            years--;
            months += 12;
        }

        if (years === 0 && months === 0) return 'Recién nacido';
        if (years === 0) return `${months} meses`;
        if (months === 0) return `${years} años`;

        return `${years} años, ${months} meses`;
    }
}