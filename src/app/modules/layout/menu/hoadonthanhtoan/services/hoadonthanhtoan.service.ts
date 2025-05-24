import { HoaDonThanhToan } from '../../../../../models/HoaDonThanhToan';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';

export interface DoanhThuRequest {
  doanhThuType: DoanhThuType;
  tuNgay: Date;
  denNgay: Date;
  soTuan: number;
}

export enum DoanhThuType {
  TheoNgay = 0,
  TheoTuan = 1,
  TheoThang = 1,
  TheoNam = 2,
}

@Injectable({
  providedIn: 'root'
})
export class HoaDonThanhToanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHoaDonThanhToan(params: any) {
    return this.http.get(`${this.apiUrl}/api/hoa-don-thanh-toan`, { params });
  }

  getHoaDonThanhToanById(id: string) {
    return this.http.get(`${this.apiUrl}/api/hoa-don-thanh-toan/${id}`);
  }

  addHoaDonThanhToan(data: any) {
    return this.http.post(`${this.apiUrl}/api/hoa-don-thanh-toan`, data);
  }

  updateHoaDonThanhToan(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/api/hoa-don-thanh-toan/${id}`, data);
  }

  deleteHoaDonThanhToan(id: string) {
    return this.http.delete(`${this.apiUrl}/api/hoa-don-thanh-toan/${id}`);
  }

  getDoanhThu(params: DoanhThuRequest) {
    const queryParams = new HttpParams()
      .set('doanhThuEnum', params.doanhThuType)
      .set('tuNgay', new Date(params.tuNgay).toISOString())
      .set('denNgay', new Date(params.denNgay).toISOString())
      .set('soTuan', params.soTuan);

    return this.http.get(`${this.apiUrl}/api/hoa-don-thanh-toan/doanh-thu`, { params: queryParams });
  }
}
