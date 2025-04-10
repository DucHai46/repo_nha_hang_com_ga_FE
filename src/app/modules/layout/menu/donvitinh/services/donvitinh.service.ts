import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DonViTinhService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDonViTinh(params: any) {
    return this.http.get(`${this.apiUrl}/api/don-vi-tinh`, { params });
  }

  getDonViTinhById(id: string) {
    return this.http.get(`${this.apiUrl}/api/don-vi-tinh/${id}`);
  }

  addDonViTinh(data: any) {
    return this.http.post(`${this.apiUrl}/api/don-vi-tinh`, data);
  }

  updateDonViTinh(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/don-vi-tinh/${id}`, data);
  }

  deleteDonViTinh(id: string) {
    return this.http.delete(`${this.apiUrl}/api/don-vi-tinh/${id}`);
  }
}
