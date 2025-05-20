/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupPhieuKiemKeComponent } from './popupPhieuKiemKe.component';

describe('PopupPhieuKiemKeComponent', () => {
  let component: PopupPhieuKiemKeComponent;
  let fixture: ComponentFixture<PopupPhieuKiemKeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPhieuKiemKeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPhieuKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
