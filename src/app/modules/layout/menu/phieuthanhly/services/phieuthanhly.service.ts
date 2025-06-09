import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhieuThanhLyService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhieuThanhLy(params: any) {
    return this.http.get(`${this.apiUrl}/api/phieu-thanh-ly`, { params });
  }

  getThanhLyById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phieu-thanh-ly/${id}`);
  }

  addPhieuThanhLy(data: any) {
    return this.http.post(`${this.apiUrl}/api/phieu-thanh-ly`, data);
  }
  deletePhieuThanhLy(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phieu-thanh-ly/${id}`);
  }
  randomNamePhieuThanhLy() {
    return this.http.get(`${this.apiUrl}/api/phieu-thanh-ly/check-ten-phieu-thanh-ly`);
  }
}
