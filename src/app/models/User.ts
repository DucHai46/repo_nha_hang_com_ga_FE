export interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    gender: boolean;
    dateOfBirth: string;
    isActive: boolean;
    phanQuyen: string;
}

export interface CreateUser {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    gender: boolean;
    dateOfBirth: string;
}
