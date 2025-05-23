import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {appRoutes} from "./app.routes";
import { MenuComponent } from './modules/layout/menu/menu.component';
import { ThongtinchungComponent } from './modules/layout/menu/admin/thongtinchung/thongtinchung.component';
import { ConfirmationDialogComponent } from './core/confirmation-dialog/confirmation-dialog.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './core/services/auth.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AuthInterceptor } from './core/interceptor/auth-interceptor';
import { FileService } from './core/services/file.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthService,
    JwtHelperService,
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS, // Đăng ký interceptor
      useClass: AuthInterceptor,
      multi: true, // Cho phép nhiều interceptor cùng hoạt động
    },  
    FileService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
