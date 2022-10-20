import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionTwoByTwoComponent } from './addition-two-by-two.component';

describe('AdditionTwoByTwoComponent', () => {
  let component: AdditionTwoByTwoComponent;
  let fixture: ComponentFixture<AdditionTwoByTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionTwoByTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionTwoByTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
