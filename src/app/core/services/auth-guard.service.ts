import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { MenuDynamic } from '../../models/MenuDynamic';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['main']);
      return false;
    }

    // Get menu items from localStorage
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]') as MenuDynamic[];
    console.log(menuItems);

    // Get the current route path
    const currentPath = route.routeConfig?.path || '';
    console.log(currentPath);

    // Check if the current path is in the allowed menu items
    const hasAccess = menuItems.some(item => item.routeLink === "main/" + currentPath);
    console.log(hasAccess);

    if (!hasAccess) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}