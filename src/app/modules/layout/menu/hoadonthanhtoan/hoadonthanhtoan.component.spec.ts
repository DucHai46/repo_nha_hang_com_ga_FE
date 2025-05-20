import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoadonthanhtoanComponent } from './hoadonthanhtoan.component';

describe('HoadonthanhtoanComponent', () => {
  let component: HoadonthanhtoanComponent;
  let fixture: ComponentFixture<HoadonthanhtoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoadonthanhtoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoadonthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
