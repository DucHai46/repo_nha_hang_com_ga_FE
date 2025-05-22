/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupPhieuThanhLyComponent } from './popupPhieuThanhLy.component';

describe('PopupPhieuXuatComponent', () => {
  let component: PopupPhieuThanhLyComponent;
  let fixture: ComponentFixture<PopupPhieuThanhLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPhieuThanhLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPhieuThanhLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
