import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditLoaiTuDoComponent } from './addoreditLoaiTuDo.component';

describe('AddoreditComponent', () => {
  let component: AddoreditLoaiTuDoComponent;
  let fixture: ComponentFixture<AddoreditLoaiTuDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditLoaiTuDoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditLoaiTuDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
