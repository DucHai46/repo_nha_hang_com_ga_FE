import { Route, Routes } from '@angular/router';
import { LoginComponent } from './modules/layout/login/login.component';
import { MenugoimonComponent } from './modules/layout/menugoimon/menugoimon.component';
import { XacnhangoimonComponent } from './modules/layout/menugoimon/xacnhangoimon/xacnhangoimon.component'
import { HomeClientComponent } from './modules/layout/home-client/home-client.component';
import { HomeComponent } from './modules/layout/home-client/pages/home/home.component';
import { AboutComponent } from './modules/layout/home-client/pages/about/about.component';
import { MenuComponent } from './modules/layout/home-client/pages/menu/menu.component';
import { BlogComponent } from './modules/layout/home-client/pages/blog/blog.component';
export const appRoutes: Route[] = [
  {
    path: '',
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
      { path: 'menu', component: MenuComponent },
      { path: 'blog', component: BlogComponent },
    ]

  }
];
