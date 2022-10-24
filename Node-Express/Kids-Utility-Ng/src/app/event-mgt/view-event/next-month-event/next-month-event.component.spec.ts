import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMonthEventComponent } from './next-month-event.component';

describe('NextMonthEventComponent', () => {
  let component: NextMonthEventComponent;
  let fixture: ComponentFixture<NextMonthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextMonthEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextMonthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
