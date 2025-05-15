import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaidonorderComponent } from './loaidonorder.component';

describe('LoaidonorderComponent', () => {
  let component: LoaidonorderComponent;
  let fixture: ComponentFixture<LoaidonorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaidonorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaidonorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
