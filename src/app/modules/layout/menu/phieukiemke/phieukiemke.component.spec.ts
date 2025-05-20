import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieukiemkeComponent } from './phieukiemke.component';

describe('PhieukiemkeComponent', () => {
  let component: PhieukiemkeComponent;
  let fixture: ComponentFixture<PhieukiemkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhieukiemkeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhieukiemkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
