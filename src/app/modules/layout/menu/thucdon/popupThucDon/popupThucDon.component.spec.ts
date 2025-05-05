/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupThucDonComponent } from './popupThucDon.component';

describe('PopupThucDonComponent', () => {
  let component: PopupThucDonComponent;
  let fixture: ComponentFixture<PopupThucDonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupThucDonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupThucDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
