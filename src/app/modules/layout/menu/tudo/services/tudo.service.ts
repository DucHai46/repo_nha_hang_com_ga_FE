import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TuDoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTuDo(params: any) {
    return this.http.get(`${this.apiUrl}/api/tu-do`, { params });
  }

  getTuDoById(id: string) {
    return this.http.get(`${this.apiUrl}/api/tu-do/${id}`);
  }

  addTuDo(data: any) {
    return this.http.post(`${this.apiUrl}/api/tu-do`, data);
  }

  updateTuDo(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/tu-do/${id}`, data);
  }

  deleteTuDo(id: string) {
    return this.http.delete(`${this.apiUrl}/api/tu-do/${id}`);
  }
}
