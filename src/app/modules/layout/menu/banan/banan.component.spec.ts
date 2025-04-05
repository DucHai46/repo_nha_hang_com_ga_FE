import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BananComponent } from './banan.component';

describe('BananComponent', () => {
  let component: BananComponent;
  let fixture: ComponentFixture<BananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BananComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
