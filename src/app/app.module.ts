import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {appRoutes} from "./app.routes";
import { MenuComponent } from './modules/layout/menu/menu.component';
import { ThongtinchungComponent } from './modules/layout/menu/admin/thongtinchung/thongtinchung.component';
import { ConfirmationDialogComponent } from './core/confirmation-dialog/confirmation-dialog.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


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
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
