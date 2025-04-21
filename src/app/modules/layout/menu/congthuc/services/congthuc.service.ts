import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CongthucService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCongThuc(params: any) {
    return this.http.get(`${this.apiUrl}/api/cong-thuc`, { params });
  }

  getCongThucById(id: string) {
    return this.http.get(`${this.apiUrl}/api/cong-thuc/${id}`);
  }

  addCongThuc(data: any) {
    return this.http.post(`${this.apiUrl}/api/cong-thuc`, data);
  }

  updateCongThuc(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/cong-thuc/${id}`, data);
  }

  deleteCongThuc(id: string) {
    return this.http.delete(`${this.apiUrl}/api/cong-thuc/${id}`);
  }
}
