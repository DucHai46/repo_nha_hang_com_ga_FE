import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditLoaiMAComponent } from './addoreditLoaiMA.component';

describe('AddoreditLoaiMAComponent', () => {
  let component: AddoreditLoaiMAComponent;
  let fixture: ComponentFixture<AddoreditLoaiMAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditLoaiMAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditLoaiMAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
