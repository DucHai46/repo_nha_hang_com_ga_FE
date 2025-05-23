import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCaLamViecComponent } from './popupCaLamViec.component';

describe('PopupCaLamViecComponent', () => {
  let component: PopupCaLamViecComponent;
  let fixture: ComponentFixture<PopupCaLamViecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupCaLamViecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCaLamViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
