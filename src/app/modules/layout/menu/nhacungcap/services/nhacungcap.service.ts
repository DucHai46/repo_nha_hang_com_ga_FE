import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NhaCungCapService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNhaCungCap(params: any) {
    return this.http.get(`${this.apiUrl}/api/nha-cung-cap`, { params });
  }

  getNhaCungCapById(id: string) {
    return this.http.get(`${this.apiUrl}/api/nha-cung-cap/${id}`);
  }

  addNhaCungCap(data: any) {
    return this.http.post(`${this.apiUrl}/api/nha-cung-cap`, data);
  }

  updateNhaCungCap(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/nha-cung-cap/${id}`, data);
  }

  deleteNhaCungCap(id: string) {
    return this.http.delete(`${this.apiUrl}/api/nha-cung-cap/${id}`);
  }
}
