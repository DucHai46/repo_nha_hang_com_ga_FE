import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
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
import { DanhMucNguyenLieuStore } from './menu/danhmucnguyenlieu/store/danh-muc-nguyen-lieu.store';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DanhmucmonanComponent } from './menu/danhmucmonan/danhmucmonan.component';
import { DanhMucMonAnStore } from './menu/danhmucmonan/store/danh-muc-mon-an.store';
import { LoainguyenlieuComponent } from './menu/loainguyenlieu/loainguyenlieu.component';
import { LoaiNguyenLieuStore } from './menu/loainguyenlieu/store/loai-nguyen-lieu.store';
import { MenugoimonComponent } from './menugoimon/menugoimon.component';
import { DanhmucmonanService } from './menu/danhmucmonan/services/danhmucmonan.service';
import { HttpClientModule } from '@angular/common/http';
import { XacnhangoimonComponent } from './menugoimon/xacnhangoimon/xacnhangoimon.component';
import { DanhmucnguyenlieuService } from './menu/danhmucnguyenlieu/services/danhmucnguyenlieu.service';
import { LoaibananComponent } from './menu/loaibanan/loaibanan.component';
import { LoaiBanAnStore } from './menu/loaibanan/store/loai-ban-an.store';
import { LoaiBanAnService } from './menu/loaibanan/services/loaibanan.service';
import { LoainguyenlieuService } from './menu/loainguyenlieu/services/loainguyenlieu.service';
import { BananComponent } from './menu/banan/banan.component';
import { BanAnStore } from './menu/banan/store/ban-an.store';
import { BanAnService } from './menu/banan/services/banan.service';
import { KhuyenmaiComponent } from './menu/khuyenmai/khuyenmai.component';
import { khuyenmaiService } from './menu/khuyenmai/services/khuyenmai.service';
import { KhuyenMaiStore } from './menu/khuyenmai/store/khuyen-mai.store';
import { DonvitinhComponent } from './menu/donvitinh/donvitinh.component';
import { DonViTinhService } from './menu/donvitinh/services/donvitinh.service';
import { DonViTinhStore } from './menu/donvitinh/store/don-vi-tinh.store';
import { LoaitudoComponent } from './menu/loaitudo/loaitudo.component';
import { LoaiTuDoService } from './menu/loaitudo/services/loaitudo.service';
import { LoaiTuDoStore } from './menu/loaitudo/store/loai-tu-do.store';
import { TudoComponent } from './menu/tudo/tudo.component';
import { TuDoService } from './menu/tudo/services/tudo.service';
import { TuDoStore } from './menu/tudo/store/tu-do.store';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NguyenlieuComponent } from './menu/nguyenlieu/nguyenlieu.component';
import { NguyenlieuService } from './menu/nguyenlieu/services/nguyenlieu.service';
import { NguyenLieuStore } from './menu/nguyenlieu/store/nguyen-lieu.store';
import { LoaimonanComponent } from './menu/loaimonan/loaimonan.component';
import { LoaimonanService} from './menu/loaimonan/services/loaimonan.service';
import { LoaiMonAnStore } from './menu/loaimonan/store/loai-mon-an.store';
import { CongthucComponent } from './menu/congthuc/congthuc.component';
import { CongthucService } from './menu/congthuc/services/congthuc.service';
import { CongThucStore } from './menu/congthuc/store/cong-thuc.store';
import { AuthService } from '../../core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from '../../core/services/auth-guard.service';
import { PopupCongThucComponent } from './menu/congthuc/popupCongThuc/popupCongThuc.component';
import { PopupLoaiBanAnComponent } from './menu/loaibanan/popupLoaiBanAn/popupLoaiBanAn.component';
import { PopupBanAnComponent } from './menu/banan/popupBanAn/popupBanAn.component';
import { PopupDanhMucMAComponent } from './menu/danhmucmonan/popupDanhMucMA/popupDanhMucMA.component';
import { PopupLoaiMAComponent } from './menu/loaimonan/popupLoaiMA/popupLoaiMA.component';
import { PopupKhuyenMaiComponent } from './menu/khuyenmai/popupLoaiKhuyenMai/popupKhuyenMai.component';
import { PopupLoaiTuDoComponent } from './menu/loaitudo/popupLoaiTuDo/popupLoaiTuDo.component';
import { PopupTuDoComponent } from './menu/tudo/popupTuDo/popupTuDo.component';
import { PopupDanhMucNLComponent } from './menu/danhmucnguyenlieu/popupDanhMucNL/popupDanhMucNL.component';
import { PopupLoaiNLComponent } from './menu/loainguyenlieu/popupLoaiNL/popupLoaiNL.component';
import { PopupDonViTinhComponent } from './menu/donvitinh/popupDonViTinh/popupDonViTinh.component';
import { PopupNguyenLieuComponent } from './menu/nguyenlieu/popupNguyenLieu/popupNguyenLieu.component';
import { MonAnStore } from './menu/monan/store/mon-an.store';
import { MonAnService } from './menu/monan/services/monan.service';
import { PopupMonAnComponent } from './menu/monan/popupMonAn/popupMonAn.component';
import { ComboComponent } from './menu/combo/combo.component';
import { ComboService } from './menu/combo/services/combo.service';
import { ComboStore } from './menu/combo/store/combo.store';
import { PopupComboComponent } from './menu/combo/popupCombo/popupCombo.component';
import { GiamgiaComponent } from './menu/giamgia/giamgia.component';
import { GiamGiaStore } from './menu/giamgia/store/giam-gia.store';
import { giamgiaService } from './menu/giamgia/services/giamgia.service';
import { PopupGiamGiaComponent } from './menu/giamgia/popupGiamGia/popupGiamGia.component';
import { PopupChiTietComponent } from './menu/congthuc/popupChiTiet/popupChiTiet.component';
import { PopupChiTietCBComponent } from './menu/combo/popupChiTiet/popupChiTietCB.component';
import { ThucdonComponent } from './menu/thucdon/thucdon.component';
import { ThucDonStore } from './menu/thucdon/store/thuc-don.store';
import { ThucDonService } from './menu/thucdon/services/thucdon.service'; 
import { PopupThucDonComponent } from './menu/thucdon/popupThucDon/popupThucDon.component';
import { PopupChiTietTDComponent } from './menu/thucdon/popupChiTiet/popupChiTietTD.component';
import { DonOrderService } from './menugoimon/services/donorder.service';
import { ChitietdonComponent } from './menugoimon/chitietdon/chitietdon.component';


import { MenuDynamicComponent } from './menu/menudynamic/menudynamic.component';
import { PopupMenuDynamicComponent } from './menu/menudynamic/popupMenuDynamic/popupMenuDynamic.component';
import { MenuDynamicStore } from './menu/menudynamic/store/menu-dynamic.store';
import { MenuDynamicService } from './menu/menudynamic/services/menudynamic.service';
import { NhaHangComponent } from './menu/nhahang/nhahang.component';
import { PopupNhaHangComponent } from './menu/nhahang/popupNhaHang/popupNhaHang.component';
import { NhaHangStore } from './menu/nhahang/store/nha-hangstore';
import { NhaHangService } from './menu/nhahang/services/nhahang.service';
import { PopupQRComponent } from './menu/banan/popupQR/popupQR.component';

@NgModule({
  declarations: [ThongtinchungComponent,
    MenuComponent,
    SidenavComponent,
    MainComponent,
    MonanComponent,
    DanhmucnguyenlieuComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    DanhmucmonanComponent,
    LoainguyenlieuComponent,
    MenugoimonComponent,
    XacnhangoimonComponent,
    LoaibananComponent,
    BananComponent,
    KhuyenmaiComponent,
    DonvitinhComponent,
    LoaitudoComponent,
    TudoComponent,
    NguyenlieuComponent,
    LoaimonanComponent,
    CongthucComponent,
    PopupCongThucComponent,
    PopupLoaiBanAnComponent,
    PopupBanAnComponent,
    PopupDanhMucMAComponent,
    PopupLoaiMAComponent,
    PopupKhuyenMaiComponent,
    PopupLoaiTuDoComponent,
    PopupTuDoComponent,
    PopupDanhMucNLComponent,
    PopupLoaiNLComponent,
    PopupDonViTinhComponent,
    PopupNguyenLieuComponent,
    PopupMonAnComponent,
    ComboComponent,
    PopupComboComponent,
    GiamgiaComponent,
    PopupGiamGiaComponent,
    PopupChiTietComponent,
    PopupChiTietCBComponent,
    ThucdonComponent,
    PopupThucDonComponent,
    PopupChiTietTDComponent,
    MenuDynamicComponent,
    PopupMenuDynamicComponent,
    NhaHangComponent,
    PopupNhaHangComponent,
    ChitietdonComponent,
    PopupQRComponent
  ], // Khai báo component
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    NzNotificationModule,
    QRCodeModule
  ],
  exports: [MenuComponent, MainComponent, SidenavComponent, LoginComponent, MenugoimonComponent],
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
    LoaiMonAnStore,
    CongthucService,
    CongThucStore,
    MonAnStore,
    MonAnService,
    ComboService,
    ComboStore,
    giamgiaService,
    GiamGiaStore,
    ThucDonStore,
    ThucDonService,
    DonOrderService,
    MenuDynamicStore,
    MenuDynamicService,
    NhaHangStore,
    NhaHangService
  ]
})
export class LayoutModule {}
