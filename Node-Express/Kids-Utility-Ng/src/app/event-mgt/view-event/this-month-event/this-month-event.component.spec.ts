import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthEventComponent } from './this-month-event.component';

describe('ThisMonthEventComponent', () => {
  let component: ThisMonthEventComponent;
  let fixture: ComponentFixture<ThisMonthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisMonthEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
