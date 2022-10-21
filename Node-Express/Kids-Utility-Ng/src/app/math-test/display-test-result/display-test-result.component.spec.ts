import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTestResultComponent } from './display-test-result.component';

describe('DisplayTestResultComponent', () => {
  let component: DisplayTestResultComponent;
  let fixture: ComponentFixture<DisplayTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTestResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
