import { HoaDonThanhToan } from '../../../../../models/HoaDonThanhToan';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HoaDonThanhToanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHoaDonThanhToan(params: any) {
    return this.http.get(`${this.apiUrl}/api/hoa-don-thanh-toan`, {params});
  }

  getHoaDonThanhToanById(id: string) {
    return this.http.get(`${this.apiUrl}/api/hoa-don-thanh-toan/${id}`);
  }

  addHoaDonThanhToan(data: any) {
    return this.http.post(`${this.apiUrl}/api/hoa-don-thanh-toan`, data);
  }

  updateHoaDonThanhToan(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/hoa-don-thanh-toan/${id}`, data);
  }

  deleteHoaDonThanhToan(id: string) {
    return this.http.delete(`${this.apiUrl}/api/hoa-don-thanh-toan/${id}`);
  }
}
