import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPhuongThucThanhToanComponent } from './popupPhuongThucThanhToan.component';

describe('PopupPhuongThucThanhToanComponent', () => {
  let component: PopupPhuongThucThanhToanComponent;
  let fixture: ComponentFixture<PopupPhuongThucThanhToanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupPhuongThucThanhToanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupPhuongThucThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
