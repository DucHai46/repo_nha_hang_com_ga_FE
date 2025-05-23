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

    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]') as MenuDynamic[];
    // console.log(menuItems);

    const currentPath = route.routeConfig?.path || '';
    // console.log(currentPath);

    const hasAccess = menuItems.some(item => item.routeLink === "main/" + currentPath);
    // console.log(hasAccess);

    if (!hasAccess) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}