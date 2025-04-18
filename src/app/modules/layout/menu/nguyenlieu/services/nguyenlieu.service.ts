import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NguyenlieuService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNguyenLieu(params: any) {
    return this.http.get(`${this.apiUrl}/api/nguyen-lieu`, { params });
  }

  getNguyenLieuById(id: string) {
    return this.http.get(`${this.apiUrl}/api/nguyen-lieu/${id}`);
  }

  addNguyenLieu(data: any) {
    return this.http.post(`${this.apiUrl}/api/nguyen-lieu`, data);
  }

  updateNguyenLieu(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/nguyen-lieu/${id}`, data);
  }

  deleteNguyenLieu(id: string) {
    return this.http.delete(`${this.apiUrl}/api/nguyen-lieu/${id}`);
  }
}
