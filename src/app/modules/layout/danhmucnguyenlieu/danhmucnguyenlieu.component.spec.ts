import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucnguyenlieuComponent } from './danhmucnguyenlieu.component';

describe('DanhmucnguyenlieuComponent', () => {
  let component: DanhmucnguyenlieuComponent;
  let fixture: ComponentFixture<DanhmucnguyenlieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhmucnguyenlieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DanhmucnguyenlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
