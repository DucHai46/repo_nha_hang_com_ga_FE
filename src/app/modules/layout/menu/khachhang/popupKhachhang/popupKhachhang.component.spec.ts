import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupKhachhangComponent } from './popupKhachhang.component';

describe('PopupKhachhangComponent', () => {
  let component: PopupKhachhangComponent;
  let fixture: ComponentFixture<PopupKhachhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupKhachhangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupKhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
