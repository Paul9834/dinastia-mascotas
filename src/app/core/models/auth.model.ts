export interface LoginRequest {
    correo: string;
    contrasena: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterRequest {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    contrasena: string;
}

export interface RegisterResponse {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    rol: string;
}
