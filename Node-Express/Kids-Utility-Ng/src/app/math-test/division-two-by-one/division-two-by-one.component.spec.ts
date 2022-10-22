import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionTwoByOneComponent } from './division-two-by-one.component';

describe('DivisionTwoByOneComponent', () => {
  let component: DivisionTwoByOneComponent;
  let fixture: ComponentFixture<DivisionTwoByOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionTwoByOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionTwoByOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
