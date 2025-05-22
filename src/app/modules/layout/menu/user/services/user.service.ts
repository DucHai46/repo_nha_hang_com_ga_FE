import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

export interface RegisterUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserUpdateInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  gender: boolean;
  dateOfBirth: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  getUserInfo(id: string) {
    return this.http.get(`${this.authUrl}/api/auth/get-user-info?id=${id}`);
  }

  updateUserInfo(id: string, data: UserUpdateInfo) {
    return this.http.put(`${this.authUrl}/api/auth/update-user-info?id=${id}`, data);
  }

  getAllUser(data: any) {
    const params = new HttpParams()
      .set('isPaging', data.isPaging)
      .set('PageNumber', data.PageNumber)
      .set('PageSize', data.PageSize)
      .set('searchFullName', data.searchFullName);
    return this.http.get(`${this.authUrl}/api/auth/get-all-users?${params}`);
  }

  updateUserRole(id: string, data: any) {
    return this.http.put(`${this.authUrl}/api/auth/update-user-role?id=${id}`, data);
  }

  updateUserPassword(id: string, data: any) {
    return this.http.put(`${this.authUrl}/api/auth/update-user-password?id=${id}`, data);
  }

  lockUser(id: string, isActive: boolean) {
    return this.http.put(`${this.authUrl}/api/auth/lock-user?id=${id}&isActive=${isActive}`, {});
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.authUrl}/api/auth/delete-user?id=${id}`);
  }

  registerUser(data: RegisterUser) {
    return this.http.post(`${this.authUrl}/api/auth/register`, data);
  }
}
