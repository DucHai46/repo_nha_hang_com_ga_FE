import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucdonComponent } from './thucdon.component';

describe('ThucdonComponent', () => {
  let component: ThucdonComponent;
  let fixture: ComponentFixture<ThucdonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThucdonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThucdonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
