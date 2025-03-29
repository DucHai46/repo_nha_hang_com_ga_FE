import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  routeLink?: string;
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

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
  
  items: MenuItem[] = [
    {
      routeLink: 'main/dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
    {
      icon: 'fal fa-box-open',
      label: 'Quản lý nguyên liệu',
      isOpen: false,
      children: [
        {
          routeLink: 'main/danhmucnguyenlieu',
          icon: 'fal fa-box',
          label: 'Danh mục nguyên liệu'
        },
        {
          routeLink: 'main/loainguyenlieu',
          icon: 'fal fa-tags',
          label: 'Loại nguyên liệu'
        }
      ]
    },
    {
      icon: 'fal fa-utensils',
      label: 'Quản lý món ăn',
      isOpen: false,
      children: [
        {
          routeLink: 'main/danhmucmonan',
          icon: 'fal fa-utensils',
          label: 'Danh mục món ăn'
        }
      ]
    }
  ];

  toggleCollapse(): void {
    this.changeIsSideNavCollapsed.emit(!this.isSideNavCollapsed());
  }

  closeSidenav(): void {
    this.changeIsSideNavCollapsed.emit(true);
  }

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
