import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusDecimalComponent } from './minus-decimal.component';

describe('MinusDecimalComponent', () => {
  let component: MinusDecimalComponent;
  let fixture: ComponentFixture<MinusDecimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinusDecimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinusDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
