import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import {LayoutModule} from "../modules/layout/layout.module";
export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  {
    path: 'admin',
    loadChildren: () => import('../modules/layout/layout.module').then((m) => m.LayoutModule),
  },
];
