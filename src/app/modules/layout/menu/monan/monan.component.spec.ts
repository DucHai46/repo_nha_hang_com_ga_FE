import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonanComponent } from './monan.component';

describe('MonanComponent', () => {
  let component: MonanComponent;
  let fixture: ComponentFixture<MonanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
