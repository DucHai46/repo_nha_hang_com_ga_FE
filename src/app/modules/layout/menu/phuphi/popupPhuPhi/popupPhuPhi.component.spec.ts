import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPhuPhiComponent } from './popupPhuPhi.component';

describe('PopupPhuPhiComponent', () => {
  let component: PopupPhuPhiComponent;
  let fixture: ComponentFixture<PopupPhuPhiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupPhuPhiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupPhuPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
