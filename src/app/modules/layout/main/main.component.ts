import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input() isLeftSidebarCollapsed!: boolean;
  @Input() screenWidth!: number;

  get sizeClass(): string {
    return this.isLeftSidebarCollapsed ? '' : this.screenWidth > 768 ? 'body-trimmed' : 'body-md-screen';
  }
}
