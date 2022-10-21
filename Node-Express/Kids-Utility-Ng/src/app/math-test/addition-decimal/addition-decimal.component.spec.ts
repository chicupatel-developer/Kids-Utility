import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionDecimalComponent } from './addition-decimal.component';

describe('AdditionDecimalComponent', () => {
  let component: AdditionDecimalComponent;
  let fixture: ComponentFixture<AdditionDecimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionDecimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
