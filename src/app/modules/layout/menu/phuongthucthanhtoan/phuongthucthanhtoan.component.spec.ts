import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongthucthanhtoanComponent } from './phuongthucthanhtoan.component';

describe('PhuongthucthanhtoanComponent', () => {
  let component: PhuongthucthanhtoanComponent;
  let fixture: ComponentFixture<PhuongthucthanhtoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhuongthucthanhtoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhuongthucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
