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
import { PhieuthanhlyComponent } from '../modules/layout/menu/phieuthanhly/phieuthanhly.component';
export const remoteRoutes: Route[] = [
  {
    path: '', component: RemoteEntryComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
          // { path: 'dashboard', component: MonanComponent },
          //Quản trị hệ thống
          { path: 'menudynamic', component: MenuDynamicComponent },
          { path: 'nhahang', component: NhaHangComponent },
          { path: 'nhanvien', component: NhanVienComponent },
          { path: 'phanquyen', component: PhanQuyenComponent },
          { path: 'khachhang', component: KhachhangComponent },
          { path: 'donvitinh', component: DonvitinhComponent },
          { path: 'khuyenmai', component: KhuyenmaiComponent },
          { path: 'congthuc', component: CongthucComponent },
          { path: 'giamgia', component: GiamgiaComponent },
          { path: 'chucvu', component: ChucVuComponent },
          { path: 'phuphi', component: PhuphiComponent },
          { path: 'banggia', component: BanggiaComponent },
          { path: 'nhacungcap', component: NhacungcapComponent },

          //Quản lý nguyên liệu
          { path: 'danhmucnguyenlieu', component: DanhmucnguyenlieuComponent },
          { path: 'loainguyenlieu', component: LoainguyenlieuComponent },
          { path: 'nguyenlieu', component: NguyenlieuComponent },

          //Quản lý món ăn - thực đơn
          { path: 'danhmucmonan', component: DanhmucmonanComponent },
          { path: 'loaimonan', component: LoaimonanComponent },
          { path: 'monan', component: MonanComponent },
          { path: 'combo', component: ComboComponent },
          { path: 'thucdon', component: ThucdonComponent },

          //Quản lý bàn ăn
          { path: 'loaibanan', component: LoaibananComponent },
          { path: 'banan', component: BananComponent },

          //Quản lý tủ đồ
          { path: 'loaitudo', component: LoaitudoComponent },
          { path: 'tudo', component: TudoComponent },

          //Quản lý đơn hàng
          { path: 'loaidonorder', component: LoaidonorderComponent },
          { path: 'donorder', component: DonorderComponent },

          //Quản lý hóa đơn - phiếu
          { path: 'hoadon', component: HoadonthanhtoanComponent },
          { path: 'phieukiemke', component: PhieukiemkeComponent },
          { path: 'phieuxuat', component: PhieuxuatComponent },
          { path: 'phieunhap', component: PhieunhapComponent },
          { path: 'phieuthanhly', component: PhieuthanhlyComponent },

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
