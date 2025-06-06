import { Route, Routes } from '@angular/router';
import { LoginComponent } from './modules/layout/login/login.component';
import { MenugoimonComponent } from './modules/layout/menugoimon/menugoimon.component';
import { XacnhangoimonComponent } from './modules/layout/menugoimon/xacnhangoimon/xacnhangoimon.component'
import { HomeClientComponent } from './modules/layout/home-client/home-client.component';
import { HomeComponent } from './modules/layout/home-client/pages/home/home.component';
import { AboutComponent } from './modules/layout/home-client/pages/about/about.component';
import { MenuClientComponent } from './modules/layout/home-client/pages/menu/menu-client.component';
import { BlogComponent } from './modules/layout/home-client/pages/blog/blog.component';
import { ThanhToanComponent } from './modules/layout/home-client/thanh-toan/thanh-toan.component';
import { ThongTinDonHangComponent } from './modules/layout/home-client/thong-tin-don-hang/thong-tin-don-hang.component';
export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home-client',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'menugoimon',
    component: MenugoimonComponent,
  },
  {
    path: 'home-client',
    component: HomeClientComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'menu', component: MenuClientComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'thanh-toan', component: ThanhToanComponent },
      { path: 'thong-tin-don-hang/:id', component: ThongTinDonHangComponent },
    ]
  }
];
