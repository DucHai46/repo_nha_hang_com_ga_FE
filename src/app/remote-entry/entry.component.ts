import { Component, Host, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-repo-ddtw-vnpt-ddtw-entry',
  template: `
    <app-sidenav [isSideNavCollapsed]="isSideNavCollapsed()"
    (changeIsSideNavCollapsed)="changeIsSideNavCollapsed($event)"></app-sidenav>
    <app-main
  [isLeftSidebarCollapsed]="isSideNavCollapsed()"
  [screenWidth]="screenWidth()"
/>
    `,
})
export class RemoteEntryComponent implements OnInit {
  isSideNavCollapsed= signal<boolean>(false);
  screenWidth=signal<number>(window.innerWidth);
  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if(this.screenWidth() <= 768) {
      this.isSideNavCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    if(this.screenWidth() <= 768) {
      this.isSideNavCollapsed.set(true);
    }
  }

  changeIsSideNavCollapsed(isSideNavCollapsed: boolean): void {
    this.isSideNavCollapsed.set(isSideNavCollapsed);
  }
}
