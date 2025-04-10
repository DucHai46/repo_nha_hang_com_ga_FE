import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonvitinhComponent } from './donvitinh.component';

describe('DonvitinhComponent', () => {
  let component: DonvitinhComponent;
  let fixture: ComponentFixture<DonvitinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonvitinhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonvitinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
