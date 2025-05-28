import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichlamviecnhanvienComponent } from './lichlamviecnhanvien.component';

describe('LichlamviecnhanvienComponent', () => {
  let component: LichlamviecnhanvienComponent;
  let fixture: ComponentFixture<LichlamviecnhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LichlamviecnhanvienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LichlamviecnhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
