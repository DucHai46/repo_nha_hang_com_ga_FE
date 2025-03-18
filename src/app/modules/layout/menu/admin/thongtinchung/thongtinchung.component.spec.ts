import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinchungComponent } from './thongtinchung.component';

describe('ThongtinchungComponent', () => {
  let component: ThongtinchungComponent;
  let fixture: ComponentFixture<ThongtinchungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThongtinchungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThongtinchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
