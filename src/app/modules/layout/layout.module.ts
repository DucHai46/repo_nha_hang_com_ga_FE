import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ThongtinchungComponent} from "./menu/admin/thongtinchung/thongtinchung.component";
import {MenuRoutes} from "./menu/menu.routes";
import {MenuComponent} from "./menu/menu.component";
import { SidenavComponent } from './sidenav/sidenav.component';
import { MonanComponent } from './menu/monan/monan.component';
import { MainComponent } from './main/main.component';
import { DanhmucnguyenlieuComponent } from './menu/danhmucnguyenlieu/danhmucnguyenlieu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddoreditComponent } from './menu/danhmucnguyenlieu/addoredit/addoredit.component';
import { DanhMucNguyenLieuStore } from './menu/danhmucnguyenlieu/store/danh-muc-nguyen-lieu.store';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DanhmucmonanComponent } from './menu/danhmucmonan/danhmucmonan.component';
import { AddoreditMAComponent } from './menu/danhmucmonan/addoreditMA/addoreditMA.component';
import { DanhMucMonAnStore } from './menu/danhmucmonan/store/danh-muc-mon-an.store';
import { LoainguyenlieuComponent } from './menu/loainguyenlieu/loainguyenlieu.component';
import { AddoreditLoaiNLComponent } from './menu/loainguyenlieu/addoreditLoaiNL/addoreditLoaiNL.component';
import { LoaiNguyenLieuStore } from './menu/loainguyenlieu/store/loai-nguyen-lieu.store';
import { MenugoimonComponent } from './menugoimon/menugoimon.component';
import { DanhmucmonanService } from './menu/danhmucmonan/services/danhmucmonan.service';
import { HttpClientModule } from '@angular/common/http';
import { XacnhangoimonComponent } from './menugoimon/xacnhangoimon/xacnhangoimon.component';
import { DanhmucnguyenlieuService } from './menu/danhmucnguyenlieu/services/danhmucnguyenlieu.service';
@NgModule({
  declarations: [ThongtinchungComponent,
    MenuComponent,
    SidenavComponent,
    MainComponent,
    MonanComponent,
    DanhmucnguyenlieuComponent,
    LoginComponent,
    AddoreditComponent,
    AddoreditMAComponent,
    AddoreditLoaiNLComponent,
    ConfirmationDialogComponent,
    DanhmucmonanComponent,
    LoainguyenlieuComponent,
    MenugoimonComponent,
    XacnhangoimonComponent
  ], // Khai báo component
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    // Đăng ký route
  ],
  exports: [MenuComponent,MainComponent, SidenavComponent,LoginComponent,MenugoimonComponent],
  providers: [
    DanhMucNguyenLieuStore,
    DanhMucMonAnStore,
    LoaiNguyenLieuStore,
    DanhmucmonanService,
    DanhmucnguyenlieuService
  ]
})
export class LayoutModule {}
