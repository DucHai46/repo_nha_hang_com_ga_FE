import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuthanhlyComponent } from './phieuthanhly.component';

describe('PhieuthanhlyComponent', () => {
  let component: PhieuthanhlyComponent;
  let fixture: ComponentFixture<PhieuthanhlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhieuthanhlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhieuthanhlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
