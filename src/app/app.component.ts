import { Component, signal } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  // isSideNavCollapsed= signal<boolean>(false);
  
  // changeIsSideNavCollapsed(isSideNavCollapsed: boolean): void {
  //   this.isSideNavCollapsed.set(isSideNavCollapsed);
  // }
}
