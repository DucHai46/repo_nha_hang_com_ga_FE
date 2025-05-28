import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChiTietLichLamViecComponent } from './popupChiTietLichLamViec.component';

describe('PopupChiTietLichLamViecComponent', () => {
  let component: PopupChiTietLichLamViecComponent;
  let fixture: ComponentFixture<PopupChiTietLichLamViecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupChiTietLichLamViecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupChiTietLichLamViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
