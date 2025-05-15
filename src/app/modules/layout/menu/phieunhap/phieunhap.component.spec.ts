import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieunhapComponent } from './phieunhap.component';

describe('PhieunhapComponent', () => {
  let component: PhieunhapComponent;
  let fixture: ComponentFixture<PhieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhieunhapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
