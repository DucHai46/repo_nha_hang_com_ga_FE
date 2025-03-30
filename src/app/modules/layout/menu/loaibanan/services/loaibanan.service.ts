import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoaiBanAnService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLoaiBanAn(params: any) {
    return this.http.get(`${this.apiUrl}/api/loai-ban`, { params });
  }

  getLoaiBanAnById(id: string) {
    return this.http.get(`${this.apiUrl}/api/loai-ban/${id}`);
  }

  addLoaiBanAn(data: any) {
    return this.http.post(`${this.apiUrl}/api/loai-ban`, data);
  }

  updateLoaiBanAn(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/loai-ban/${id}`, data);
  }

  deleteLoaiBanAn(id: string) {
    return this.http.delete(`${this.apiUrl}/api/loai-ban/${id}`);
  }
}
