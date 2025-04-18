import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditNguyenLieuComponent } from './addoreditNguyenLieu.component';

describe('AddoreditNguyenLieuComponent', () => {
  let component: AddoreditNguyenLieuComponent;
  let fixture: ComponentFixture<AddoreditNguyenLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddoreditNguyenLieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddoreditNguyenLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
