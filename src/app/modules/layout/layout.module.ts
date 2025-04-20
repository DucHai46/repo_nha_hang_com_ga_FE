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
import { LoaibananComponent } from './menu/loaibanan/loaibanan.component';
import { LoaiBanAnStore } from './menu/loaibanan/store/loai-ban-an.store';
import { LoaiBanAnService } from './menu/loaibanan/services/loaibanan.service';
import { AddoreditLoaiBanComponent } from './menu/loaibanan/addoredit/addoreditLoaiBan.component';
import { LoainguyenlieuService } from './menu/loainguyenlieu/services/loainguyenlieu.service';
import { BananComponent } from './menu/banan/banan.component';
import { BanAnStore } from './menu/banan/store/ban-an.store';
import { BanAnService } from './menu/banan/services/banan.service';
import { AddoreditBanComponent } from './menu/banan/addoredit/addoreditBan.component';
import { KhuyenmaiComponent } from './menu/khuyenmai/khuyenmai.component';
import { khuyenmaiService } from './menu/khuyenmai/services/khuyenmai.service';
import { KhuyenMaiStore } from './menu/khuyenmai/store/khuyen-mai.store';
import { AddoreditKhuyenMaiComponent } from './menu/khuyenmai/addoredit/addoreditKhuyenMai.component';
import { DonvitinhComponent } from './menu/donvitinh/donvitinh.component';
import { DonViTinhService } from './menu/donvitinh/services/donvitinh.service';
import { DonViTinhStore } from './menu/donvitinh/store/don-vi-tinh.store';
import { AddoreditDonViTinhComponent } from './menu/donvitinh/addoredit/addoreditDonViTinh.component';
import { LoaitudoComponent } from './menu/loaitudo/loaitudo.component';
import { LoaiTuDoService } from './menu/loaitudo/services/loaitudo.service';
import { LoaiTuDoStore } from './menu/loaitudo/store/loai-tu-do.store';
import { AddoreditLoaiTuDoComponent } from './menu/loaitudo/addoredit/addoreditLoaiTuDo.component';
import { TudoComponent } from './menu/tudo/tudo.component';
import { TuDoService } from './menu/tudo/services/tudo.service';
import { TuDoStore } from './menu/tudo/store/tu-do.store';
import { AddoreditTuDoComponent } from './menu/tudo/addoredit/addoreditTuDo.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NguyenlieuComponent } from './menu/nguyenlieu/nguyenlieu.component';
import { NguyenlieuService } from './menu/nguyenlieu/services/nguyenlieu.service';
import { NguyenLieuStore } from './menu/nguyenlieu/store/nguyen-lieu.store';
import { AddoreditNguyenLieuComponent } from './menu/nguyenlieu/addoredit/addoreditNguyenLieu.component';
import { LoaimonanComponent } from './menu/loaimonan/loaimonan.component';
import { LoaimonanService} from './menu/loaimonan/services/loaimonan.service';
import { LoaiMonAnStore } from './menu/loaimonan/store/loai-mon-an.store';
import { AddoreditLoaiMAComponent } from './menu/loaimonan/addoredit/addoreditLoaiMA.component';


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
    XacnhangoimonComponent,
    LoaibananComponent,
    AddoreditLoaiBanComponent,
    BananComponent,
    AddoreditBanComponent,
    KhuyenmaiComponent,
    AddoreditKhuyenMaiComponent,
    DonvitinhComponent,
    AddoreditDonViTinhComponent,
    LoaitudoComponent,
    AddoreditLoaiTuDoComponent,
    TudoComponent,
    AddoreditTuDoComponent,
    NguyenlieuComponent,
    AddoreditNguyenLieuComponent,
    LoaimonanComponent,
    AddoreditLoaiMAComponent

  ], // Khai báo component
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule
    // Đăng ký route
  ],
  exports: [MenuComponent,MainComponent, SidenavComponent,LoginComponent,MenugoimonComponent],
  providers: [
    DanhMucNguyenLieuStore,
    DanhMucMonAnStore,
    LoaiNguyenLieuStore,
    DanhmucmonanService,
    DanhmucnguyenlieuService,
    LoaiBanAnStore,
    LoaiBanAnService,
    LoainguyenlieuService,
    BanAnStore,
    BanAnService,
    khuyenmaiService,
    KhuyenMaiStore,
    DonViTinhService,
    DonViTinhStore,
    LoaiTuDoService,
    LoaiTuDoStore,
    TuDoService,
    TuDoStore,
    NguyenlieuService,
    NguyenLieuStore,
    LoaimonanService,
    LoaiMonAnStore

  ]
})
export class LayoutModule {}
