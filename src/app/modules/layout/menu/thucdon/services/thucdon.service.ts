import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ThucDonService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getThucDon(params: any) {
    return this.http.get(`${this.apiUrl}/api/thuc-don`, { params });
  }

  getThucDonById(id: string) {
    return this.http.get(`${this.apiUrl}/api/thuc-don/${id}`);
  }

  addThucDon(data: any) {
    return this.http.post(`${this.apiUrl}/api/thuc-don`, data);
  }

  updateThucDon(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/thuc-don/${id}`, data);
  }

  deleteThucDon(id: string) {
    return this.http.delete(`${this.apiUrl}/api/thuc-don/${id}`);
  }
}
