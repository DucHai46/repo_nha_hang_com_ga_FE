import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditTuDoComponent } from './addoreditTuDo.component';

describe('AddoreditComponent', () => {
  let component: AddoreditTuDoComponent;
  let fixture: ComponentFixture<AddoreditTuDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditTuDoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditTuDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
