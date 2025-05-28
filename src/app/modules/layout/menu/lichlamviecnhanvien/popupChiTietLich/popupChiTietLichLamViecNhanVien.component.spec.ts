import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChiTietLichLamViecNhanVienComponent } from './popupChiTietLichLamViecNhanVien.component';

describe('PopupChiTietLichLamViecNhanVienComponent', () => {
  let component: PopupChiTietLichLamViecNhanVienComponent;
  let fixture: ComponentFixture<PopupChiTietLichLamViecNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupChiTietLichLamViecNhanVienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupChiTietLichLamViecNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
