import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-repo-ddtw-vnpt-ddtw-entry',
  template: `
    <app-sidenav [isSideNavCollapsed]="isSideNavCollapsed()"
    (changeIsSideNavCollapsed)="changeIsSideNavCollapsed($event)"></app-sidenav>
    <app-main></app-main>
    `,
})
export class RemoteEntryComponent {
  isSideNavCollapsed= signal<boolean>(false);
  changeIsSideNavCollapsed(isSideNavCollapsed: boolean): void {
    this.isSideNavCollapsed.set(isSideNavCollapsed);
  }
}
