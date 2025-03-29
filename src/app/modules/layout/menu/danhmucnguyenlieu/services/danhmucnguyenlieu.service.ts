import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DanhmucnguyenlieuService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDanhMucNguyenLieu(params: any) {
    return this.http.get(`${this.apiUrl}/api/danh-muc-nguyen-lieu`, { params });
  }

  getDanhMucNguyenLieuById(id: string) {
    return this.http.get(`${this.apiUrl}/api/danh-muc-nguyen-lieu/${id}`);
  }

  addDanhMucNguyenLieu(data: any) {
    return this.http.post(`${this.apiUrl}/api/danh-muc-nguyen-lieu`, data);
  }

  updateDanhMucNguyenLieu(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/danh-muc-nguyen-lieu/${id}`, data);
  }

  deleteDanhMucNguyenLieu(id: string) {
    return this.http.delete(`${this.apiUrl}/api/danh-muc-nguyen-lieu/${id}`);
  }
}
