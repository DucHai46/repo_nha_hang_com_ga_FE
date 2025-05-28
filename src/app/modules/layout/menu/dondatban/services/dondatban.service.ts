import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class dondatbanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDonDatBan(params: any) {
    return this.http.get(`${this.apiUrl}/api/don-dat-ban`, { params });
  }

  getDonDatBanById(id: string) {
    return this.http.get(`${this.apiUrl}/api/don-dat-ban/${id}`);
  }

  addDonDatBan(data: any) {
    return this.http.post(`${this.apiUrl}/api/don-dat-ban`, data);
  }

  updateDonDatBan(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/don-dat-ban/${id}`, data);
  }

  deleteDonDatBan(id: string) {
    return this.http.delete(`${this.apiUrl}/api/don-dat-ban/${id}`);
  }
}
