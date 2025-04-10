import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditKhuyenMaiComponent } from './addoreditKhuyenMai.component';

describe('AddoreditKhuyenMaiComponent', () => {
  let component: AddoreditKhuyenMaiComponent;
  let fixture: ComponentFixture<AddoreditKhuyenMaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditKhuyenMaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditKhuyenMaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
