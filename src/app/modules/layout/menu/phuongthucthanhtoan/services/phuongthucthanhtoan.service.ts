import { PhuongThucThanhToan } from './../../../../../models/PhuongThucThanhToan';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhuongThucThanhToanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhuongThucThanhToan(params: any) {
    return this.http.get(`${this.apiUrl}/api/phuong-thuc-thanh-toan`, params);
  }

  getPhuongThucThanhToanById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phuong-thuc-thanh-toan/${id}`);
  }

  addPhuongThucThanhToan(data: any) {
    return this.http.post(`${this.apiUrl}/api/phuong-thuc-thanh-toan`, data);
  }

  updatePhuongThucThanhToan(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/phuong-thuc-thanh-toan/update-status/${id}`, data);
  }

  deletePhuongThucThanhToan(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phuong-thuc-thanh-toan/${id}`);
  }
}
