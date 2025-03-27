import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DanhmucmonanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDanhMucMonAn(params: any) {
    return this.http.get(`${this.apiUrl}/api/danh-muc-mon-an`, { params });
  }

  getDanhMucMonAnById(id: string) {
    return this.http.get(`${this.apiUrl}/api/danh-muc-mon-an/${id}`);
  }

  addDanhMucMonAn(data: any) {
    return this.http.post(`${this.apiUrl}/api/danh-muc-mon-an`, data);
  }

  updateDanhMucMonAn(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/danh-muc-mon-an/${id}`, data);
  }

  deleteDanhMucMonAn(id: string) {
    return this.http.delete(`${this.apiUrl}/api/danh-muc-mon-an/${id}`);
  }
}
