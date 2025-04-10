import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class khuyenmaiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKhuyenMai(params: any) {
    return this.http.get(`${this.apiUrl}/api/khuyen-mai`, { params });
  }

  getKhuyenMaiById(id: string) {
    return this.http.get(`${this.apiUrl}/api/khuyen-mai/${id}`);
  }

  addKhuyenMai(data: any) {
    return this.http.post(`${this.apiUrl}/api/khuyen-mai`, data);
  }

  updateKhuyenMai(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/khuyen-mai/${id}`, data);
  }

  deleteKhuyenMai(id: string) {
    return this.http.delete(`${this.apiUrl}/api/khuyen-mai/${id}`);
  }
}
