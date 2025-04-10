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
export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent,
    children: [
      { path: 'main', component: MainComponent,
        children: [
          { path: 'dashboard', component: MonanComponent },
          { path: 'danhmucnguyenlieu', component: DanhmucnguyenlieuComponent },
          { path: 'danhmucmonan', component: DanhmucmonanComponent },
          { path: 'loainguyenlieu', component: LoainguyenlieuComponent },
          { path: 'loaibanan', component: LoaibananComponent },
          { path: 'banan', component: BananComponent },
          { path: 'khuyenmai', component: KhuyenmaiComponent },
          { path: 'donvitinh', component: DonvitinhComponent },
          { path: 'loaitudo', component: LoaitudoComponent },
          { path: 'tudo', component: TudoComponent },

          // { path: 'thongtinchung', component: ThongtinchungComponent },
        ]
      },
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('../modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'menugoimon',
    component: MenugoimonComponent,
  },
];
