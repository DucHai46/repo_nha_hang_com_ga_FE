import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NhaHangService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNhaHang(params: any) {
    return this.http.get(`${this.apiUrl}/api/nha-hang`, { params });
  }

  getNhaHangById(id: string) {
    return this.http.get(`${this.apiUrl}/api/nha-hang/${id}`);
  }

  addNhaHang(data: any) {
    return this.http.post(`${this.apiUrl}/api/nha-hang`, data);
  }

  updateNhaHang(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/nha-hang/${id}`, data);
  }

  deleteNhaHang(id: string) {
    return this.http.delete(`${this.apiUrl}/api/nha-hang/${id}`);
  }

  getGiaoDien(id: any, isActive: boolean) {
    const params = new HttpParams();
    if (id) {
      params.set('id', id);
    }
    if (isActive) {
      params.set('isActive', isActive);
    }
    return this.http.get(`${this.apiUrl}/api/nha-hang/giao-dien`, { params });
  }

  addGiaoDien(id: string, data: any) {
    return this.http.post(`${this.apiUrl}/api/nha-hang/${id}/giao-dien`, data);
  }

  updateGiaoDien(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/nha-hang/${id}/giao-dien`, data);
  }
}
