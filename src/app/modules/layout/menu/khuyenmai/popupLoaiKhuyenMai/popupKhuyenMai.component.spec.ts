/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupKhuyenMaiComponent } from './popupKhuyenMai.component';

describe('PopupLoaiBanAnComponent', () => {
  let component: PopupKhuyenMaiComponent;
  let fixture: ComponentFixture<PopupKhuyenMaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupKhuyenMaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupKhuyenMaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
