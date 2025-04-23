import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register(body: any) {
    return this.http.post(`${this.authUrl}/auth/api/auth/register`, body);
  }

  login(body: any) {
    return this.http.post(`${this.authUrl}/auth/api/auth/token`, body);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

}
