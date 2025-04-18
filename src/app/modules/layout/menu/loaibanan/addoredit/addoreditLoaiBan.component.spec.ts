import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditComponent } from './addoreditLoaiBan.component';

describe('AddoreditComponent', () => {
  let component: AddoreditComponent;
  let fixture: ComponentFixture<AddoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
