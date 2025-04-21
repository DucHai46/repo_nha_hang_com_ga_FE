import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditCongThucComponent } from './addoreditCongThuc.component';

describe('AddoreditBanComponent', () => {
  let component: AddoreditCongThucComponent;
  let fixture: ComponentFixture<AddoreditCongThucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditCongThucComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditCongThucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
