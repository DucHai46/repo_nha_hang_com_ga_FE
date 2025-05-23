import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLichLamViecComponent } from './popupLichLamViec.component';

describe('PopupLichLamViecComponent', () => {
  let component: PopupLichLamViecComponent;
  let fixture: ComponentFixture<PopupLichLamViecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupLichLamViecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupLichLamViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
