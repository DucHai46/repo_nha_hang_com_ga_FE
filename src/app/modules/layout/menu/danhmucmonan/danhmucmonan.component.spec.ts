import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucmonanComponent } from './danhmucmonan.component';

describe('DanhmucmonanComponent', () => {
  let component: DanhmucmonanComponent;
  let fixture: ComponentFixture<DanhmucmonanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhmucmonanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DanhmucmonanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
