import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { MonanComponent } from '../modules/layout/menu/monan/monan.component';
import { MainComponent } from '../modules/layout/main/main.component';
import { DanhmucnguyenlieuComponent } from '../modules/layout/menu/danhmucnguyenlieu/danhmucnguyenlieu.component';
import { DanhmucmonanComponent } from '../modules/layout/menu/danhmucmonan/danhmucmonan.component';
import { LoainguyenlieuComponent } from '../modules/layout/menu/loainguyenlieu/loainguyenlieu.component';
import { LoginComponent } from '../modules/layout/login/login.component';
import { MenugoimonComponent } from '../modules/layout/menugoimon/menugoimon.component';
import { LoaibananComponent } from '../modules/layout/menu/loaibanan/loaibanan.component';
import { BananComponent } from '../modules/layout/menu/banan/banan.component';
import { KhuyenmaiComponent } from '../modules/layout/menu/khuyenmai/khuyenmai.component';
import { DonvitinhComponent } from '../modules/layout/menu/donvitinh/donvitinh.component';
import { LoaitudoComponent } from '../modules/layout/menu/loaitudo/loaitudo.component';
import { TudoComponent } from '../modules/layout/menu/tudo/tudo.component';
import { NguyenlieuComponent } from '../modules/layout/menu/nguyenlieu/nguyenlieu.component';
import { LoaimonanComponent } from '../modules/layout/menu/loaimonan/loaimonan.component';
import { CongthucComponent } from '../modules/layout/menu/congthuc/congthuc.component';
import { AuthGuardService as AuthGuard } from '../core/services/auth-guard.service';
import { XacnhangoimonComponent } from '../modules/layout/menugoimon/xacnhangoimon/xacnhangoimon.component';
import { GiamgiaComponent } from '../modules/layout/menu/giamgia/giamgia.component';
import { ComboComponent } from '../modules/layout/menu/combo/combo.component';
import { ThucdonComponent } from '../modules/layout/menu/thucdon/thucdon.component';
import { MenuDynamicComponent } from '../modules/layout/menu/menudynamic/menudynamic.component';
import { NhaHangComponent } from '../modules/layout/menu/nhahang/nhahang.component';
import { ChitietdonComponent } from '../modules/layout/menugoimon/chitietdon/chitietdon.component';
import { ChucVuComponent } from '../modules/layout/menu/chucvu/chucvu.component';
import { NhanVienComponent } from '../modules/layout/menu/nhanvien/nhanvien.component';
import { BanggiaComponent } from '../modules/layout/menu/banggia/banggia.component';
import { LoaidonorderComponent } from '../modules/layout/menu/loaidonorder/loaidonorder.component';
import { KhachhangComponent } from '../modules/layout/menu/khachhang/khachhang.component';
import { DonorderComponent } from '../modules/layout/menu/donorder/donorder.component';
import { PhieunhapComponent } from '../modules/layout/menu/phieunhap/phieunhap.component';
import { NhacungcapComponent } from '../modules/layout/menu/nhacungcap/nhacungcap.component';

import { PhuphiComponent } from '../modules/layout/menu/phuphi/phuphi.component';
import { HoadonthanhtoanComponent } from '../modules/layout/menu/hoadonthanhtoan/hoadonthanhtoan.component';

import { PhieukiemkeComponent } from '../modules/layout/menu/phieukiemke/phieukiemke.component';
import { PhieuxuatComponent } from '../modules/layout/menu/phieuxuat/phieuxuat.component';
import { PhanQuyenComponent } from '../modules/layout/menu/phanquyen/phanquyen.component';

import { PhuongThucThanhToanComponent } from '../modules/layout/menu/phuongthucthanhtoan/phuongthucthanhtoan.component';

import { PhieuthanhlyComponent } from '../modules/layout/menu/phieuthanhly/phieuthanhly.component';
import { UserComponent } from '../modules/layout/menu/user/user.component';
import { DashboardBaoCaoThongKeComponent } from '../modules/layout/menu/dashboardBaoCaoThongKe/dashboardBaoCaoThongKe/dashboardBaoCaoThongKe.component';
export const remoteRoutes: Route[] = [
  {
    path: '', component: RemoteEntryComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
        children: [
          // { path: 'dashboard', component: MonanComponent },
          //Quản trị hệ thống
          { path: 'menudynamic', component: MenuDynamicComponent, canActivate: [AuthGuard] },
          { path: 'nhahang', component: NhaHangComponent, canActivate: [AuthGuard] },
          { path: 'nhanvien', component: NhanVienComponent, canActivate: [AuthGuard] },
          { path: 'phanquyen', component: PhanQuyenComponent, canActivate: [AuthGuard] },
          { path: 'khachhang', component: KhachhangComponent, canActivate: [AuthGuard] },
          { path: 'donvitinh', component: DonvitinhComponent, canActivate: [AuthGuard] },
          { path: 'khuyenmai', component: KhuyenmaiComponent, canActivate: [AuthGuard] },
          { path: 'congthuc', component: CongthucComponent, canActivate: [AuthGuard] },
          { path: 'giamgia', component: GiamgiaComponent, canActivate: [AuthGuard] },
          { path: 'chucvu', component: ChucVuComponent, canActivate: [AuthGuard] },
          { path: 'phuphi', component: PhuphiComponent, canActivate: [AuthGuard] },
          { path: 'banggia', component: BanggiaComponent, canActivate: [AuthGuard] },
          { path: 'nhacungcap', component: NhacungcapComponent, canActivate: [AuthGuard] },

          //Quản lý nguyên liệu
          { path: 'danhmucnguyenlieu', component: DanhmucnguyenlieuComponent, canActivate: [AuthGuard] },
          { path: 'loainguyenlieu', component: LoainguyenlieuComponent, canActivate: [AuthGuard] },
          { path: 'nguyenlieu', component: NguyenlieuComponent, canActivate: [AuthGuard] },

          //Quản lý món ăn - thực đơn
          { path: 'danhmucmonan', component: DanhmucmonanComponent, canActivate: [AuthGuard] },
          { path: 'loaimonan', component: LoaimonanComponent, canActivate: [AuthGuard] },
          { path: 'monan', component: MonanComponent, canActivate: [AuthGuard] },
          { path: 'combo', component: ComboComponent, canActivate: [AuthGuard] },
          { path: 'thucdon', component: ThucdonComponent, canActivate: [AuthGuard] },

          //Quản lý bàn ăn
          { path: 'loaibanan', component: LoaibananComponent, canActivate: [AuthGuard] },
          { path: 'banan', component: BananComponent, canActivate: [AuthGuard] },

          //Quản lý tủ đồ
          { path: 'loaitudo', component: LoaitudoComponent, canActivate: [AuthGuard] },
          { path: 'tudo', component: TudoComponent, canActivate: [AuthGuard] },

          //Quản lý đơn hàng
          { path: 'loaidonorder', component: LoaidonorderComponent, canActivate: [AuthGuard] },
          { path: 'donorder', component: DonorderComponent, canActivate: [AuthGuard] },

          //Quản lý hóa đơn - phiếu
          { path: 'hoadon', component: HoadonthanhtoanComponent, canActivate: [AuthGuard] },
          { path: 'phieukiemke', component: PhieukiemkeComponent, canActivate: [AuthGuard] },
          { path: 'phieuxuat', component: PhieuxuatComponent, canActivate: [AuthGuard] },
          { path: 'phieunhap', component: PhieunhapComponent, canActivate: [AuthGuard] },
          { path: 'phieuthanhly', component: PhieuthanhlyComponent, canActivate: [AuthGuard] },

          // Quản lý hóa đơn
          { path: 'phuongthuc', component: PhuongThucThanhToanComponent, canActivate: [AuthGuard] },
          { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
          { path: 'dashboard', component: DashboardBaoCaoThongKeComponent, canActivate: [AuthGuard] },
          // { path: 'thongtinchung', component: ThongtinchungComponent },
        ]
      },
    ]
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('../modules/layout/layout.module').then((m) => m.LayoutModule),
  // },
  {
    path: 'menugoimon/:id',
    component: MenugoimonComponent,
  },
  {
    path: 'xacnhangoimon',
    component: XacnhangoimonComponent,
  },
  {
    path: 'chitietdon',
    component: ChitietdonComponent,
  },
];
