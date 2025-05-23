import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CaLamViecService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCaLamViec(params: any) {
    return this.http.get(`${this.apiUrl}/api/ca-lam-viec`, { params });
  }

  getCaLamViecById(id: string) {
    return this.http.get(`${this.apiUrl}/api/ca-lam-viec/${id}`);
  }

  addCaLamViec(data: any) {
    return this.http.post(`${this.apiUrl}/api/ca-lam-viec`, data);
  }

  updateCaLamViec(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/ca-lam-viec/${id}`, data);
  }

  deleteCaLamViec(id: string) {
    return this.http.delete(`${this.apiUrl}/api/ca-lam-viec/${id}`);
  }
}
