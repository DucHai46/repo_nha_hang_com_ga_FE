import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaimonanComponent } from './loaimonan.component';

describe('LoaimonanComponent', () => {
  let component: LoaimonanComponent;
  let fixture: ComponentFixture<LoaimonanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaimonanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaimonanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
