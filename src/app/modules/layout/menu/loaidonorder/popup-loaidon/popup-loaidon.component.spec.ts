import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLoaidonComponent } from './popup-loaidon.component';

describe('PopupLoaidonComponent', () => {
  let component: PopupLoaidonComponent;
  let fixture: ComponentFixture<PopupLoaidonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupLoaidonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupLoaidonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
