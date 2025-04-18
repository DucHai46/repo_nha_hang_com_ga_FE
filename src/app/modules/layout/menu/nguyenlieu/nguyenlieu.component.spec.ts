import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguyenlieuComponent } from './nguyenlieu.component';

describe('NguyenlieuComponent', () => {
  let component: NguyenlieuComponent;
  let fixture: ComponentFixture<NguyenlieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NguyenlieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NguyenlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
