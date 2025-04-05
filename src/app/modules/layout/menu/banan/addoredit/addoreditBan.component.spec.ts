import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditBanComponent } from './addoreditBan.component';

describe('AddoreditBanComponent', () => {
  let component: AddoreditBanComponent;
  let fixture: ComponentFixture<AddoreditBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditBanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
