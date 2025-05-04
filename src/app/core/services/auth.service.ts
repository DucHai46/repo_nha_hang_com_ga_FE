import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, @Inject(PLATFORM_ID) private platformId: Object) { }

  register(body: any) {
    return this.http.post(`${this.authUrl}/api/auth/register`, body);
  }

  login(body: any) {
    return this.http.post(`${this.authUrl}/api/auth/token`, body);
  }

  isAuthenticated(): boolean {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

}
