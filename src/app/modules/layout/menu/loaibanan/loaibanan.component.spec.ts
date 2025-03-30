import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaibananComponent } from './loaibanan.component';

describe('LoaibananComponent', () => {
  let component: LoaibananComponent;
  let fixture: ComponentFixture<LoaibananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaibananComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaibananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
