import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuxuatComponent } from './phieuxuat.component';

describe('PhieuxuatComponent', () => {
  let component: PhieuxuatComponent;
  let fixture: ComponentFixture<PhieuxuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhieuxuatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhieuxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
