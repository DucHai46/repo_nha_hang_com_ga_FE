import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoainguyenlieuComponent } from './loainguyenlieu.component';

describe('LoainguyenlieuComponent', () => {
  let component: LoainguyenlieuComponent;
  let fixture: ComponentFixture<LoainguyenlieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoainguyenlieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoainguyenlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
