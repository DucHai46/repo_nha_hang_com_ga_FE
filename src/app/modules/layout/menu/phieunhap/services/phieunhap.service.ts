import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhieuNhapService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhieuNhap(params: any) {
    return this.http.get(`${this.apiUrl}/api/phieu-nhap`, { params });
  }

  getPhieuNhapById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phieu-nhap/${id}`);
  }

  addPhieuNhap(data: any) {
    return this.http.post(`${this.apiUrl}/api/phieu-nhap`, data);
  }
  deletePhieuNhap(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phieu-nhap/${id}`);
  }
}
