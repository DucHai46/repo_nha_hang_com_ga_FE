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
        },
        {
          routeLink: 'main/nguyenlieu',
          icon: 'fal fa-onion',
          label: 'Nguyên liệu'
        },
        {
          routeLink: 'main/donvitinh',
          icon: 'fal fa-calculator',
          label: 'Đơn vị tính'
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
        },
        {
          routeLink: 'main/loaimonan',
          icon: 'fal fa-tags',
          label: 'Loại món ăn'
        },
        {
          routeLink: 'main/congthuc',
          icon: 'fal fa-book-open',
          label: 'Công thức'
        },
      ]
    },
    {
      icon: 'fal fa-table',
      label: 'Quản lý bàn ăn',
      isOpen: false,
      children: [
        {
          routeLink: 'main/loaibanan',
          icon: 'fal fa-table',
          label: 'Loại bàn ăn'
        },
        {
          routeLink: 'main/banan',
          icon: 'fal fa-table',
          label: 'Bàn ăn'
        },
      ]
    },
    {
      icon: 'fal fa-star',
      label: 'Giảm giá & khuyến mại',
      isOpen: false,
      children: [
        {
          routeLink: 'main/khuyenmai',
          icon: 'fal fa-gift',
          label: 'Khuyến mại'
        },
        {
          routeLink: 'main/giamgia',
          icon: 'fal fa-gift',
          label: 'Giảm giá'
        },

      ]
    },
    {
      icon: 'fal fa-cabinet-filing',
      label: 'Tủ đồ',
      isOpen: false,
      children: [
        {
          routeLink: 'main/loaitudo',
          icon: 'fal fa-door-closed',
          label: 'Loại tủ đồ'
        },
        {
          routeLink: 'main/tudo',
          icon: 'fal fa-door-closed',
          label: 'Tủ đồ'
        },

      ]
    },
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

  logout() {
    localStorage.removeItem('token');
  }
}
