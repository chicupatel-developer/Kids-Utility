import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPreviousMonthEventComponent } from './all-previous-month-event.component';

describe('AllPreviousMonthEventComponent', () => {
  let component: AllPreviousMonthEventComponent;
  let fixture: ComponentFixture<AllPreviousMonthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPreviousMonthEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPreviousMonthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
