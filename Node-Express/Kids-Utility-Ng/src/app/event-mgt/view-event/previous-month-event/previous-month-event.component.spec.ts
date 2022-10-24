import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousMonthEventComponent } from './previous-month-event.component';

describe('PreviousMonthEventComponent', () => {
  let component: PreviousMonthEventComponent;
  let fixture: ComponentFixture<PreviousMonthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousMonthEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousMonthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
