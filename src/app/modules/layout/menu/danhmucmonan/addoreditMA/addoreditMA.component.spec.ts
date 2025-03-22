import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditMAComponent } from './addoreditMA.component';

describe('AddoreditComponent', () => {
  let component: AddoreditMAComponent;
  let fixture: ComponentFixture<AddoreditMAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditMAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditMAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
