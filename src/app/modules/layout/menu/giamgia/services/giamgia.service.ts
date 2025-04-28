import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class giamgiaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGiamGia(params: any) {
    return this.http.get(`${this.apiUrl}/api/giam-gia`, { params });
  }

  getGiamGiaById(id: string) {
    return this.http.get(`${this.apiUrl}/api/giam-gia/${id}`);
  }

  addGiamGia(data: any) {
    return this.http.post(`${this.apiUrl}/api/giam-gia`, data);
  }

  updateGiamGia(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/giam-gia/${id}`, data);
  }

  deleteGiamGia(id: string) {
    return this.http.delete(`${this.apiUrl}/api/giam-gia/${id}`);
  }
}
