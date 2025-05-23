import { PopupThanhToanComponent } from './menu/donorder/popupThanhToan/popupThanhToan.component';
import { LoaiDonOrder } from './../../models/LoaiDonOrder';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { ThongtinchungComponent } from "./menu/admin/thongtinchung/thongtinchung.component";
import { MenuRoutes } from "./menu/menu.routes";
import { MenuComponent } from "./menu/menu.component";
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
import { LoaimonanService } from './menu/loaimonan/services/loaimonan.service';
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
import { NhaHangStore } from './menu/nhahang/store/nha-hang.store';
import { NhaHangService } from './menu/nhahang/services/nhahang.service';
import { PopupQRComponent } from './menu/banan/popupQR/popupQR.component';
import { ChucVuComponent } from './menu/chucvu/chucvu.component';
import { PopupChucVuComponent } from './menu/chucvu/popupChucVu/popupChucVu.component';
import { ChucVuStore } from './menu/chucvu/store/chuc-vu.store';
import { ChucVuService } from './menu/chucvu/services/chucvu.service';
import { NhanVienComponent } from './menu/nhanvien/nhanvien.component';
import { PopupNhanVienComponent } from './menu/nhanvien/popupNhanVien/popupNhanVien.component';
import { NhanVienService } from './menu/nhanvien/services/nhanvien.service';
import { NhanVienStore } from './menu/nhanvien/store/nhan-vien.store';
import { BanggiaComponent } from './menu/banggia/banggia.component';
import { BangGiaService } from './menu/banggia/services/banggia.service';
import { BangGiaStore } from './menu/banggia/store/bang-gia.store';
import { LoaidonorderComponent } from './menu/loaidonorder/loaidonorder.component';
import { PopupLoaidonComponent } from './menu/loaidonorder/popup-loaidon/popup-loaidon.component';
import { LoaiDonOrderStore } from './menu/loaidonorder/store/loai-don-order.store';
import { LoaidonorderService } from './menu/loaidonorder/services/loaidonorder.service';
import { DonorderComponent } from './menu/donorder/donorder.component';
import { KhachhangComponent } from './menu/khachhang/khachhang.component';
import { PopupKhachhangComponent } from './menu/khachhang/popupKhachhang/popupKhachhang.component';
import { KhachHangService } from './menu/khachhang/services/khachhang.service';
import { KhachHangStore } from './menu/khachhang/store/khach-hang.store';
import { DonOrderStore } from './menu/donorder/store/don-order.store';
import { PopupChiTietDonOrderComponent } from './menu/donorder/popupChiTietDonOrder/popupChiTietDonOrder.component';
import { PhieunhapComponent } from './menu/phieunhap/phieunhap.component';
import { PhieuNhapStore } from './menu/phieunhap/store/phieu-nhap.store';
import { PhieuNhapService } from './menu/phieunhap/services/phieunhap.service';
import { PopupPhieuNhapComponent } from './menu/phieunhap/popupPhieuNhap/popupPhieuNhap.component';
import { NhacungcapComponent } from './menu/nhacungcap/nhacungcap.component';
import { NhaCungCapService } from './menu/nhacungcap/services/nhacungcap.service';
import { NhaCungCapStore } from './menu/nhacungcap/store/nha-cung-cap.store';
import { PopupNhaCungCapComponent } from './menu/nhacungcap/popupNhaCungCap/popupNhaCungCap.component';
import { PopupChiTietPhieuNhapComponent } from './menu/phieunhap/popupChiTiet/popupChiTietPhieuNhap.component';
import { DonOrderAdminService } from './menu/donorder/services/donorderadmin.service';

import { HoadonthanhtoanComponent } from './menu/hoadonthanhtoan/hoadonthanhtoan.component';
import { PhuphiComponent } from './menu/phuphi/phuphi.component';
import { PhuPhiStore } from './menu/phuphi/store/phu-phi.store';
import { PhuPhiService } from './menu/phuphi/services/phuphi.service';
import { PopupPhuPhiComponent } from './menu/phuphi/popupPhuPhi/popupPhuPhi.component';
import { PhuongThucThanhToanComponent } from './menu/phuongthucthanhtoan/phuongthucthanhtoan.component';
import { PhuongThucThanhToanService } from './menu/phuongthucthanhtoan/services/phuongthucthanhtoan.service';
import { PhuongThucThanhToanStore } from './menu/phuongthucthanhtoan/store/phuong-thuc-thanh-toan.store';
import { HoaDonThanhToanService } from './menu/hoadonthanhtoan/services/hoadonthanhtoan.service';
import { HoaDonThanhToanStore } from './menu/hoadonthanhtoan/store/hoa-don-thanh-toan.store';
import { PopupChiTietHoaDonComponent } from './menu/hoadonthanhtoan/popupChiTietHoaDon/popupChiTietHoaDon.component';
import { UserComponent } from './menu/user/user.component';
import { PopupUserComponent } from './menu/user/popupUser/popupUser.component';
import { PhieukiemkeComponent } from './menu/phieukiemke/phieukiemke.component';
import { PhieuKiemKeService } from './menu/phieukiemke/services/phieukiemke.service';
import { PhieuKiemKeStore } from './menu/phieukiemke/store/phieu-kiem-ke.store';
import { PopupPhieuKiemKeComponent } from './menu/phieukiemke/popupPhieuKiemKe/popupPhieuKiemKe.component';
import { PopupChiTietPhieuKiemKeComponent } from './menu/phieukiemke/popupChiTiet/popupChiTietPhieuKiemKe.component';
import { PhieuxuatComponent } from './menu/phieuxuat/phieuxuat.component';
import { PhieuXuatService } from './menu/phieuxuat/services/phieuxuat.service';
import { PhieuXuatStore } from './menu/phieuxuat/store/phieu-xuat.store';
import { PopupPhieuXuatComponent } from './menu/phieuxuat/popupPhieuXuat/popupPhieuXuat.component';
import { PopupChiTietPhieuXuatComponent } from './menu/phieuxuat/popupChiTiet/popupChiTietPhieuXuat.component';
import { PhanQuyenComponent } from './menu/phanquyen/phanquyen.component';
import { PopupPhanQuyenComponent } from './menu/phanquyen/popupPhanQuyen/popupPhanQuyen.component';
import { PhanQuyenStore } from './menu/phanquyen/store/phan-quyen.store';
import { PhanQuyenService } from './menu/phanquyen/services/phanquyen.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PopupPhuongThucThanhToanComponent } from './menu/phuongthucthanhtoan/popupPhuongThucThanhToan/popupPhuongThucThanhToan.component';

import { PhieuthanhlyComponent } from './menu/phieuthanhly/phieuthanhly.component';
import { PhieuThanhLyService } from './menu/phieuthanhly/services/phieuthanhly.service';
import { PhieuThanhLyStore } from './menu/phieuthanhly/store/phieu-thanh-ly.store';
import { PopupPhieuThanhLyComponent } from './menu/phieuthanhly/popupPhieuThanhLy/popupPhieuThanhLy.component';
import { PopupChiTietPhieuThanhLyComponent } from './menu/phieuthanhly/popupChiTiet/popupChiTietPhieuThanhLy.component';

import { UserStore } from './menu/user/store/user.store';
import { UserService } from './menu/user/services/user.service';
import { PopupChangePasswordComponent } from './menu/user/popupChangePass/popupChangePass.component';
import { PopupPhanQuyenUserComponent } from './menu/user/popupPhanQuyen/popupPhanQuyenUser.component';
import { CalamviecComponent } from './menu/calamviec/calamviec.component';
import { PopupCaLamViecComponent } from './menu/calamviec/popupCaLamViec/popupCaLamViec.component';
import { CaLamViecService } from './menu/calamviec/services/calamviec.service';
import { CaLamViecStore } from './menu/calamviec/store/ca-lam-viec.store';
import { LichlamviecComponent } from './menu/lichlamviec/lichlamviec.component';
import { LichLamViecService } from './menu/lichlamviec/services/lichlamviec.service';
import { LichLamViecStore } from './menu/lichlamviec/store/lich-lam-viec.store';
import { PopupLichLamViecComponent } from './menu/lichlamviec/popupLichLamViec/popupLichLamViec.component';
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
    ChitietdonComponent,
    MenuDynamicComponent,
    PopupMenuDynamicComponent,
    NhaHangComponent,
    PopupNhaHangComponent,
    ChitietdonComponent,
    PopupQRComponent,
    ChucVuComponent,
    PopupChucVuComponent,
    NhanVienComponent,
    PopupNhanVienComponent,
    BanggiaComponent,
    LoaidonorderComponent,
    PopupLoaidonComponent,
    DonorderComponent,
    KhachhangComponent,
    PopupKhachhangComponent,
    PopupChiTietDonOrderComponent,
    PhieunhapComponent,
    PopupPhieuNhapComponent,
    NhacungcapComponent,
    PopupNhaCungCapComponent,
    PopupChiTietPhieuNhapComponent,

    HoadonthanhtoanComponent,
    PhuphiComponent,
    PopupPhuPhiComponent,
    PhuongThucThanhToanComponent,
    PopupChiTietHoaDonComponent,
    PopupThanhToanComponent,
    PhieukiemkeComponent,
    PopupPhieuKiemKeComponent,
    PopupChiTietPhieuKiemKeComponent,
    PhieuxuatComponent,
    PopupPhieuXuatComponent,
    PopupChiTietPhieuXuatComponent,
    PhanQuyenComponent,
    PopupPhanQuyenComponent,

    PopupPhuongThucThanhToanComponent,

    PhieuthanhlyComponent,
    PopupPhieuThanhLyComponent,
    PopupChiTietPhieuThanhLyComponent,
    UserComponent,
    PopupUserComponent,
    PopupChangePasswordComponent,
    PopupPhanQuyenUserComponent,
    CalamviecComponent,
    PopupCaLamViecComponent,
    LichlamviecComponent,
    PopupLichLamViecComponent,
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
    QRCodeModule,
    NzSelectModule
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
    NhaHangService,
    ChucVuStore,
    ChucVuService,
    NhanVienStore,
    NhanVienService,
    BangGiaStore,
    BangGiaService,
    LoaiDonOrderStore,
    LoaidonorderService,
    KhachHangService,
    KhachHangStore,
    DonOrderStore,
    PhieuNhapStore,
    PhieuNhapService,
    NhaCungCapStore,
    NhaCungCapService,
    DonOrderAdminService,
    CaLamViecService,
    CaLamViecStore,
    LichLamViecService,
    LichLamViecStore,

    PhuPhiStore,
    PhuPhiService,
    PhuongThucThanhToanService,
    PhuongThucThanhToanStore,
    HoaDonThanhToanService,
    HoaDonThanhToanStore,

    PhieuKiemKeStore,
    PhieuKiemKeService,
    PhieuXuatService,
    PhieuXuatStore,
    PhanQuyenStore,
    PhanQuyenService,
    PhieuThanhLyService,
    PhieuThanhLyStore,
    PhanQuyenService,
    UserStore,
    UserService
  ]
})
export class LayoutModule { }
