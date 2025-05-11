import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNhanVien(params: any) {
    return this.http.get(`${this.apiUrl}/api/nhan-vien`, { params });
  }

  getNhanVienById(id: string) {
    return this.http.get(`${this.apiUrl}/api/nhan-vien/${id}`);
  }

  addNhanVien(data: any) {
    return this.http.post(`${this.apiUrl}/api/nhan-vien`, data);
  }

  updateNhanVien(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/nhan-vien/${id}`, data);
  }

  deleteNhanVien(id: string) {
    return this.http.delete(`${this.apiUrl}/api/nhan-vien/${id}`);
  }
}
