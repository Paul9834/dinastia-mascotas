export type PetSex = 'MALE' | 'FEMALE' | 'UNKNOWN';

export interface Pet {
    id: number;
    name: string;
    species: string;
    breed?: string | null;
    sex?: PetSex | null;
    birthDate?: string | null;
    photoUrl?: string | null;
    userId: number;
}

export interface CreatePetRequest {
    name: string;
    species: string;
    breed?: string | null;
    sex?: PetSex | null;
    color: string | null;
    birthDate?: string | null;
    photoUrl?: string | null;
}

export interface UpdatePetRequest {
    name?: string;
    species?: string;
    breed?: string | null;
    sex?: PetSex | null;
    birthDate?: string | null;
    photoUrl?: string | null;
}

export type UiPetSex = 'Male' | 'Female';

export interface CreatePetForm {
    name: string;
    species: string;
    breed?: string | null;
    sex?: UiPetSex | null;
    birthDate?: Date | null;
    photoUrl?: string | null;
}
