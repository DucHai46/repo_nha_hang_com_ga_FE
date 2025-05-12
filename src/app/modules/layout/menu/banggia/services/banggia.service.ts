import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BangGiaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBangGia(params: any) {
    return this.http.get(`${this.apiUrl}/api/bang-gia`, { params });
  }

  getBangGiaById(id: string) {
    return this.http.get(`${this.apiUrl}/api/bang-gia/${id}`);
  }

  addBangGia(data: any) {
    return this.http.post(`${this.apiUrl}/api/bang-gia`, data);
  }

  updateBangGia(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/bang-gia/${id}`, data);
  }

  deleteBangGia(id: string) {
    return this.http.delete(`${this.apiUrl}/api/bang-gia/${id}`);
  }
}
