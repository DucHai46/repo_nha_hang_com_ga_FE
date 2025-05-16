import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKhachHang(params: any) {
    return this.http.get(`${this.apiUrl}/api/khach-hang`, { params });
  }

  getKhachHangById(id: string) {
    return this.http.get(`${this.apiUrl}/api/khach-hang/${id}`);
  }


  addKhachHang(data: any) {
    return this.http.post(`${this.apiUrl}/api/khach-hang`, data);
  }

  updateKhachHang(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/khach-hang/${id}`, data);
  }

  deleteKhachHang(id: string) {
    return this.http.delete(`${this.apiUrl}/api/khach-hang/${id}`);
  }
}
