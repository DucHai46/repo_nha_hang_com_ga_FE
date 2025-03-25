import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenugoimonComponent } from './menugoimon.component';

describe('MenugoimonComponent', () => {
    let component: MenugoimonComponent;
  let fixture: ComponentFixture<MenugoimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenugoimonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenugoimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
