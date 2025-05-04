import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authToken = '';
    if (isPlatformBrowser(this.platformId)) {
      authToken = localStorage.getItem('token') || '';
    }
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}` // Sửa lại cách đặt header
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}