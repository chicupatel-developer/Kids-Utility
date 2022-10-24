import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekEventComponent } from './this-week-event.component';

describe('ThisWeekEventComponent', () => {
  let component: ThisWeekEventComponent;
  let fixture: ComponentFixture<ThisWeekEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisWeekEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
