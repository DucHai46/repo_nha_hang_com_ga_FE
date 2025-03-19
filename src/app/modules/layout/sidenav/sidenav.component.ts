import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  // standalone :true ,
  // imports :[RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',

})
export class SidenavComponent {
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
}
