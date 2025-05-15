import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoaidonorderService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLoaidonorder(params: any) {
    return this.http.get(`${this.apiUrl}/api/loai-don`, { params });
  }

  getLoaidonorderById(id: string) {
    return this.http.get(`${this.apiUrl}/api/loai-don/${id}`);
  }

  addLoaidonorder(data: any) {
    return this.http.post(`${this.apiUrl}/api/loai-don`, data);
  }

  updateLoaidonorder(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/loai-don/${id}`, data);
  }

  deleteLoaidonorder(id: string) {
    return this.http.delete(`${this.apiUrl}/api/loai-don/${id}`);
  }
}
