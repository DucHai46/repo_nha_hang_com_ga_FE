import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhieuXuatService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhieuXuat(params: any) {
    return this.http.get(`${this.apiUrl}/api/phieu-xuat`, { params });
  }

  getPhieuXuatById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phieu-xuat/${id}`);
  }

  addPhieuXuat(data: any) {
    return this.http.post(`${this.apiUrl}/api/phieu-xuat`, data);
  }
  deletePhieuXuat(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phieu-xuat/${id}`);
  }

  randomNamePhieuXuat() {
    return this.http.get(`${this.apiUrl}/api/phieu-xuat/check-ten-phieu-xuat`);
  }
}
