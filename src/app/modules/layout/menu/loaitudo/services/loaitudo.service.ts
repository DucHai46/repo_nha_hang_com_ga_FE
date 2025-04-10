import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoaiTuDoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLoaiTuDo(params: any) {
    return this.http.get(`${this.apiUrl}/api/loai-tu-do`, { params });
  }

  getLoaiTuDoById(id: string) {
    return this.http.get(`${this.apiUrl}/api/loai-tu-do/${id}`);
  }

  addLoaiTuDo(data: any) {
    return this.http.post(`${this.apiUrl}/api/loai-tu-do`, data);
  }

  updateLoaiTuDo(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/loai-tu-do/${id}`, data);
  }

  deleteLoaiTuDo(id: string) {
    return this.http.delete(`${this.apiUrl}/api/loai-tu-do/${id}`);
  }
}
