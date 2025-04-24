import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileUrl = environment.fileUrl;

  constructor(private http: HttpClient) { }

  downloadFile(fileId: string) {
    return this.http.get(`${this.fileUrl}/api/files/download/${fileId}`, {
      responseType: 'blob'
    });
  }
  
  addFile(data: any) {
    return this.http.post(`${this.fileUrl}/api/files/upload`, data);
  }
  
  deleteFile(fileId: string) {
    return this.http.delete(`${this.fileUrl}/api/files/delete/${fileId}`);
  }
}
