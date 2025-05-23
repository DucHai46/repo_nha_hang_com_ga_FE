import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalamviecComponent } from './calamviec.component';

describe('CalamviecComponent', () => {
  let component: CalamviecComponent;
  let fixture: ComponentFixture<CalamviecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalamviecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalamviecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
