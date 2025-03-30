import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoainguyenlieuService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLoaiNguyenLieu(params: any) {
    return this.http.get(`${this.apiUrl}/api/loai-nguyen-lieu`, { params });
  }

  getLoaiNguyenLieuById(id: string) {
    return this.http.get(`${this.apiUrl}/api/loai-nguyen-lieu/${id}`);
  }

  addLoaiNguyenLieu(data: any) {
    return this.http.post(`${this.apiUrl}/api/loai-nguyen-lieu`, data);
  }

  updateLoaiNguyenLieu(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/loai-nguyen-lieu/${id}`, data);
  }

  deleteLoaiNguyenLieu(id: string) {
    return this.http.delete(`${this.apiUrl}/api/loai-nguyen-lieu/${id}`);
  }
}
