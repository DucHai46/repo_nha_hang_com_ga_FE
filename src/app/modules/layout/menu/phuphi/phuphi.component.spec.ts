import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuphiComponent } from './phuphi.component';

describe('PhuphiComponent', () => {
  let component: PhuphiComponent;
  let fixture: ComponentFixture<PhuphiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhuphiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhuphiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
