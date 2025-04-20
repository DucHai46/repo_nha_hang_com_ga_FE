import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoaimonanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLoaiMonAn(params: any) {
    return this.http.get(`${this.apiUrl}/api/loai-mon-an`, { params });
  }

  getLoaiMonAnById(id: string) {
    return this.http.get(`${this.apiUrl}/api/loai-mon-an/${id}`);
  }

  addLoaiMonAn(data: any) {
    return this.http.post(`${this.apiUrl}/api/loai-mon-an`, data);
  }

  updateLoaiMonAn(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/loai-mon-an/${id}`, data);
  }

  deleteLoaiMonAn(id: string) {
    return this.http.delete(`${this.apiUrl}/api/loai-mon-an/${id}`);
  }
}
