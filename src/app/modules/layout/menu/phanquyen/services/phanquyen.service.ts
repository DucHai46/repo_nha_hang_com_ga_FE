import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhanQuyenService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhanQuyen(params: any) {
    return this.http.get(`${this.apiUrl}/api/phan-quyen`, { params });
  }

  getPhanQuyenById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phan-quyen/${id}`);
  }

  addPhanQuyen(data: any) {
    return this.http.post(`${this.apiUrl}/api/phan-quyen`, data);
  }

  updatePhanQuyen(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/phan-quyen/${id}`, data);
  }

  deletePhanQuyen(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phan-quyen/${id}`);
  }
}
