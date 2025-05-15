import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorderComponent } from './donorder.component';

describe('DonorderComponent', () => {
  let component: DonorderComponent;
  let fixture: ComponentFixture<DonorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
