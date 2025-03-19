import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ThongtinchungComponent} from "./menu/admin/thongtinchung/thongtinchung.component";
import {MenuRoutes} from "./menu/menu.routes";
import {MenuComponent} from "./menu/menu.component";
import { SidenavComponent } from './sidenav/sidenav.component';
import { MonanComponent } from './menu/monan/monan.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [ThongtinchungComponent,
    MenuComponent,
    SidenavComponent,
    MainComponent,
    MonanComponent], // Khai báo component
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes), // Đăng ký route
  ],
  exports: [MenuComponent,MainComponent, SidenavComponent]
})
export class LayoutModule {}
