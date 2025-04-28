import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCombo(params: any) {
    return this.http.get(`${this.apiUrl}/api/combo`, { params });
  }

  getComboById(id: string) {
    return this.http.get(`${this.apiUrl}/api/combo/${id}`);
  }

  addCombo(data: any) {
    return this.http.post(`${this.apiUrl}/api/combo`, data);
  }

  updateCombo(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/combo/${id}`, data);
  }

  deleteCombo(id: string) {
    return this.http.delete(`${this.apiUrl}/api/combo/${id}`);
  }
}
