import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChiTietDonOrderComponent } from './popupChiTietDonOrder.component';

describe('PopupChiTietDonOrderComponent', () => {
  let component: PopupChiTietDonOrderComponent;
  let fixture: ComponentFixture<PopupChiTietDonOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupChiTietDonOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupChiTietDonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
