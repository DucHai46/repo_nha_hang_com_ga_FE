import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TudoComponent } from './tudo.component';

describe('TudoComponent', () => {
  let component: TudoComponent;
  let fixture: ComponentFixture<TudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TudoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
