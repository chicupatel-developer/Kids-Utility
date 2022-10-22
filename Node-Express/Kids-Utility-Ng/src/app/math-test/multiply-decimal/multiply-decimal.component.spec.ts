import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplyDecimalComponent } from './multiply-decimal.component';

describe('MultiplyDecimalComponent', () => {
  let component: MultiplyDecimalComponent;
  let fixture: ComponentFixture<MultiplyDecimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplyDecimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplyDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
