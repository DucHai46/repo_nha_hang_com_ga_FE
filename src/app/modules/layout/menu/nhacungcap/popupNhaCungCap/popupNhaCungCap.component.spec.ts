/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupNhaCungCapComponent } from './popupNhaCungCap.component';

describe('PopupNhaCungCapComponent', () => {
  let component: PopupNhaCungCapComponent;
  let fixture: ComponentFixture<PopupNhaCungCapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNhaCungCapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNhaCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
