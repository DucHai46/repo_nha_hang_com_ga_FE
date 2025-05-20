import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhuPhiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhuPhi(params: any) {
    return this.http.get(`${this.apiUrl}/api/phu-phi`, { params });
  }

  getPhuPhiById(id: string) {
    return this.http.get(`${this.apiUrl}/api/phu-phi/${id}`);
  }

  addPhuPhi(data: any) {
    return this.http.post(`${this.apiUrl}/api/phu-phi`, data);
  }

  updatePhuPhi(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/phu-phi/${id}`, data);
  }

  deletePhuPhi(id: string) {
    return this.http.delete(`${this.apiUrl}/api/phu-phi/${id}`);
  }
}
