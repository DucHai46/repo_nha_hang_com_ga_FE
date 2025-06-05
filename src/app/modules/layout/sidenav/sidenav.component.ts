import { Component, input, OnInit, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TuDoService } from '../menu/tudo/services/tudo.service';
import { MenuDynamicService } from '../menu/menudynamic/services/menudynamic.service';
import { MenuDynamic } from '../../../models/MenuDynamic';

interface MenuItem {
  id?: string;
  routeLink?: string;
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})

export class SidenavComponent implements OnInit {

  constructor(private menuService: MenuDynamicService, private router: Router) { }

  menuItems: MenuDynamic[] = [];
  listMenuDynamic: any[] = [];
  token = localStorage.getItem('token');

  ngOnInit(): void {
    if (this.token) {
      const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
      console.log(decodedToken);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const userInfor = {
        id: decodedToken['sub'],
        name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        nhanVienId: decodedToken['nhanVienId']
      }
      localStorage.setItem('userInfor', JSON.stringify(userInfor));
      this.menuService.getListMenuDynamic(role).subscribe((res: any) => {
        this.listMenuDynamic = res.data.danhSachMenu;
        this.menuService.getMenuDynamicByRole(this.listMenuDynamic).subscribe({
          next: (res: any) => {
            if (res.result == 1) {
              this.menuItems = res.data.data;
              localStorage.setItem('menuItems', JSON.stringify(this.menuItems));
              this.convertToMenuItem(this.menuItems);
            }
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      });
    }
  }
  isSideNavCollapsed = input.required<boolean>();
  changeIsSideNavCollapsed = output<boolean>();

  convertToMenuItem(menuItems: MenuDynamic[]): void {
    const sortedMenuItems = [...this.menuItems].sort((a, b) => Number(a.position) - Number(b.position));

    sortedMenuItems.forEach(item => {
      if (item.parent.id == null && item.isActive == true) {
        this.items.push({
          id: item.id,
          routeLink: item.routeLink,
          icon: item.icon,
          label: item.label,
          isOpen: item.isOpen,
          children: []
        });
      }
    });

    this.items.sort((a, b) => {
      const aItem = sortedMenuItems.find(item => item.id === a.id);
      const bItem = sortedMenuItems.find(item => item.id === b.id);
      return Number(aItem?.position) - Number(bItem?.position);
    });

    this.items.forEach(item => {
      const childItems = sortedMenuItems
        .filter(menuItem => menuItem.parent.id === item.id && menuItem.isActive === true)
        .sort((a, b) => Number(a.position) - Number(b.position));

      childItems.forEach(childItem => {
        item.children?.push({
          id: childItem.id,
          routeLink: childItem.routeLink,
          icon: childItem.icon,
          label: childItem.label,
          isOpen: childItem.isOpen,
          children: []
        });
      });
    });
  }

  items: MenuItem[] = [
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
    localStorage.removeItem('userInfor');
    localStorage.removeItem('menuItems');
    this.router.navigate(['']);
  }

  infoUser() {

    this.router.navigate(['/main/userinfor']);
  }
}
