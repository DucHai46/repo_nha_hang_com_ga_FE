import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietdonComponent } from './chitietdon.component';

describe('ChitietdonComponent', () => {
  let component: ChitietdonComponent;
  let fixture: ComponentFixture<ChitietdonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChitietdonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChitietdonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
