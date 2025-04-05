import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BanAnService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBanAn(params: any) {
    return this.http.get(`${this.apiUrl}/api/ban`, { params });
  }

  getBanAnById(id: string) {
    return this.http.get(`${this.apiUrl}/api/ban/${id}`);
  }

  addBanAn(data: any) {
    return this.http.post(`${this.apiUrl}/api/ban`, data);
  }

  updateBanAn(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/ban/${id}`, data);
  }

  deleteBanAn(id: string) {
    return this.http.delete(`${this.apiUrl}/api/ban/${id}`);
  }
}
