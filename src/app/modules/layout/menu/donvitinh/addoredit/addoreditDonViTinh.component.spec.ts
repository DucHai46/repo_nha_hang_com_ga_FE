import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditDonViTinhComponent } from './addoreditDonViTinh.component';

describe('AddoreditDonViTinhComponent', () => {
  let component: AddoreditDonViTinhComponent;
  let fixture: ComponentFixture<AddoreditDonViTinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditDonViTinhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditDonViTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
