import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhieuKiemKeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhieuKiemKe(params: any) {
    return this.http.get(`${this.apiUrl}/api/phieu-kiem-ke`, { params });
  }

  getKiemKeById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phieu-kiem-ke/${id}`);
  }

  addPhieuKiemKe(data: any) {
    return this.http.post(`${this.apiUrl}/api/phieu-kiem-ke`, data);
  }
  deletePhieuKiemKe(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phieu-kiem-ke/${id}`);
  }
}
