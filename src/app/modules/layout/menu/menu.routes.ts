import { Route } from '@angular/router';
import {ThongtinchungComponent} from "./admin/thongtinchung/thongtinchung.component";
import { MonanComponent } from './monan/monan.component';


export const MenuRoutes: Route[] = [
  { path: 'thongtinchung', component: ThongtinchungComponent },
  { path: 'dashboard', component: MonanComponent },
];
