import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DondatbanComponent } from './dondatban.component';

describe('DondatbanComponent', () => {
  let component: DondatbanComponent;
  let fixture: ComponentFixture<DondatbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DondatbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DondatbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
