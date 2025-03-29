import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacnhangoimonComponent } from './xacnhangoimon.component';

describe('XacnhangoimonComponent', () => {
  let component: XacnhangoimonComponent;
  let fixture: ComponentFixture<XacnhangoimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XacnhangoimonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XacnhangoimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
