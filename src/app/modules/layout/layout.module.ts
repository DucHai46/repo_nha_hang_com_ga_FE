import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ThongtinchungComponent} from "./menu/admin/thongtinchung/thongtinchung.component";
import {MenuRoutes} from "./menu/menu.routes";
import {MenuComponent} from "./menu/menu.component";
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [ThongtinchungComponent,
  MenuComponent,
  SidenavComponent], // Khai báo component
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes), // Đăng ký route
  ],
})
export class LayoutModule {}
