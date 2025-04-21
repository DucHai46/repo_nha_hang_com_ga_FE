import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class fileService {

  private fileUrl = environment.fileUrl;

  constructor(private http: HttpClient) { }



  getFileById(fileId: string) {
    return this.http.get(`${this.fileUrl}/file/api/files/download/${fileId}`);
  }
  addFile(data: any) {
    return this.http.post(`${this.fileUrl}/file/api/files/upload`, data);
  }
  deleteFile(fileId: string) {
    return this.http.delete(`${this.fileUrl}/file/api/files/delete/${fileId}`);
  }
}
