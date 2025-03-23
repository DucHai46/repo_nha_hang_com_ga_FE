import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditLoaiNLComponent } from './addoreditLoaiNL.component';

describe('AddoreditComponent', () => {
  let component: AddoreditLoaiNLComponent;
  let fixture: ComponentFixture<AddoreditLoaiNLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditLoaiNLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditLoaiNLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
