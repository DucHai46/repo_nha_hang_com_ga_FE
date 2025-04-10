import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaitudoComponent } from './loaitudo.component';

describe('LoaitudoComponent', () => {
  let component: LoaitudoComponent;
  let fixture: ComponentFixture<LoaitudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaitudoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaitudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
