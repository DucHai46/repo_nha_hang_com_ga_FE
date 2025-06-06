import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LichLamViecService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLichLamViec(params: any) {
    return this.http.get(`${this.apiUrl}/api/lich-lam-viec`, { params });
  }

  getLichLamViecById(id: string) {
    return this.http.get(`${this.apiUrl}/api/lich-lam-viec/${id}`);
  }

  addLichLamViec(data: any) {
    return this.http.post(`${this.apiUrl}/api/lich-lam-viec`, data);
  }

  updateLichLamViec(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/lich-lam-viec/${id}`, data);
  }

  deleteLichLamViec(id: string) {
    return this.http.delete(`${this.apiUrl}/api/lich-lam-viec/${id}`);
  }
}
