import { Route, Routes } from '@angular/router';
import { LoginComponent } from './modules/layout/login/login.component';
import { MenugoimonComponent } from './modules/layout/menugoimon/menugoimon.component';
import {XacnhangoimonComponent} from './modules/layout/menugoimon/xacnhangoimon/xacnhangoimon.component'
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
    path: 'menugoimon',
    component: MenugoimonComponent,
  },
  {
    path: 'xacnhangoimon',
    component: XacnhangoimonComponent,
  },
];
