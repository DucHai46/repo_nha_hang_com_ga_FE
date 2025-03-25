import { Route, Routes } from '@angular/router';
import { LoginComponent } from './modules/layout/login/login.component';
import { MenugoimonComponent } from './modules/layout/menugoimon/menugoimon.component';
export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'menugoimon',
    component: MenugoimonComponent,
  },
];
