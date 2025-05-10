import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MenuDynamicService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMenuDynamic(params: any) {
    return this.http.get(`${this.apiUrl}/api/menu-dynamic`, { params });
  }

  getMenuDynamicById(id: string) {
    return this.http.get(`${this.apiUrl}/api/menu-dynamic/${id}`);
  }

  addMenuDynamic(data: any) {
    return this.http.post(`${this.apiUrl}/api/menu-dynamic`, data);
  }

  updateMenuDynamic(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/menu-dynamic/${id}`, data);
  }

  deleteMenuDynamic(id: string) {
    return this.http.delete(`${this.apiUrl}/api/menu-dynamic/${id}`);
  }
}
