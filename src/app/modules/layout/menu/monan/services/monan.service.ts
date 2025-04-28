import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MonAnService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMonAn(params: any) {
    return this.http.get(`${this.apiUrl}/api/mon-an`, { params });
  }

  getMonAnById(id: string) {
    return this.http.get(`${this.apiUrl}/api/mon-an/${id}`);
  }

  addMonAn(data: any) {
    return this.http.post(`${this.apiUrl}/api/mon-an`, data);
  }

  updateMonAn(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/mon-an/${id}`, data);
  }

  deleteMonAn(id: string) {
    return this.http.delete(`${this.apiUrl}/api/mon-an/${id}`);
  }
}
