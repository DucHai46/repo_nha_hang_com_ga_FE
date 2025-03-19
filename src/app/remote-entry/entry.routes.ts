import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { MonanComponent } from '../modules/layout/menu/monan/monan.component';
import { MainComponent } from '../modules/layout/main/main.component';
export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent,
    children: [
      { path: 'main', component: MainComponent,
        children: [
          { path: 'dashboard', component: MonanComponent },
          // { path: 'thongtinchung', component: ThongtinchungComponent },
        ]
      },
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('../modules/layout/layout.module').then((m) => m.LayoutModule),
  },
];
