import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChucVuService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getChucVu(params: any) {
    return this.http.get(`${this.apiUrl}/api/chuc-vu`, { params });
  }

  getChucVuById(id: string) {
    return this.http.get(`${this.apiUrl}/api/chuc-vu/${id}`);
  }

  addChucVu(data: any) {
    return this.http.post(`${this.apiUrl}/api/chuc-vu`, data);
  }

  updateChucVu(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/chuc-vu/${id}`, data);
  }

  deleteChucVu(id: string) {
    return this.http.delete(`${this.apiUrl}/api/chuc-vu/${id}`);
  }
}
