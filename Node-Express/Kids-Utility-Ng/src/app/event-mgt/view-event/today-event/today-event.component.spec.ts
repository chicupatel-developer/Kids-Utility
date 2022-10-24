import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayEventComponent } from './today-event.component';

describe('TodayEventComponent', () => {
  let component: TodayEventComponent;
  let fixture: ComponentFixture<TodayEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
