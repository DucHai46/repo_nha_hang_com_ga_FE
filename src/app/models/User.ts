export interface User {
    id: string;
    fullName: string;
    isActive: boolean;
    phanQuyen: string;
    nhanVienId: string;
}

export interface CreateUser {
    fullName: string;
    username: string;
    password: string;
    nhanVienId: string;
}
