import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  // standalone :true ,
  // imports :[RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',

})
export class SidenavComponent {
  isSideNavCollapsed = input.required<boolean>();
  changeIsSideNavCollapsed = output<boolean>();
  items=[
    {
      routeLink: 'dashboard',
      icon : 'fal fa-home',
      label : 'Dashboard'
    },
    {
      routeLink: 'products',
      icon : 'fal fa-box-open',
      label : 'Products'
    },
    {
      routeLink: 'pages',
      icon : 'fal fa-file',
      label : 'Pages'
    },
    {
      routeLink: 'settings',
      icon : 'fal fa-cog',
      label : 'Settings'
    },
  ]
  toggleCollapse(): void{
    this.changeIsSideNavCollapsed.emit(!this.isSideNavCollapsed());
  }
  closeSidenav(): void{
    this.changeIsSideNavCollapsed.emit(true);
  }
}
