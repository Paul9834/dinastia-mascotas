export interface Appointment {
    id: number;
    petId: number;
    petName: string; // El campo nuevo
    title: string;
    dateTime: string;
    type: 'VACCINE' | 'CHECKUP' | 'SURGERY' | 'GROOMING' | 'OTHER';
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE';
    notes?: string;
}
export interface CreateAppointmentDto {
    petId: number;
    title: string;
    dateTime: string;
    type: string;
    notes?: string;
}