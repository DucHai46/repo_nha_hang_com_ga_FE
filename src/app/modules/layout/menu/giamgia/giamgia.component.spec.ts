import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiamgiaComponent } from './giamgia.component';

describe('GiamgiaComponent', () => {
  let component: GiamgiaComponent;
  let fixture: ComponentFixture<GiamgiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiamgiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiamgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
