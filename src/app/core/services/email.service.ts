import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

export interface Email {
  to: string;
  subject: string;
  body: string;
  isHtml: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendEmail(email: Email) {
    return this.http.post(`${this.emailUrl}/api/Email/send`, email);
  }
}
