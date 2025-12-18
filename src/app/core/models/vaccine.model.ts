export interface Vaccine {
    id: number;
    petId: number;
    petName: string;
    name: string;
    applicationDate: string;
    nextDueDate?: string;
    veterinarian?: string;
    status: 'ACTIVE' | 'DUE_SOON' | 'OVERDUE';
    batchNumber?: string;
    notes?: string;
}