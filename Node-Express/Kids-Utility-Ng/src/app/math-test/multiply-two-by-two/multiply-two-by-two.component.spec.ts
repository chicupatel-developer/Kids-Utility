import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplyTwoByTwoComponent } from './multiply-two-by-two.component';

describe('MultiplyTwoByTwoComponent', () => {
  let component: MultiplyTwoByTwoComponent;
  let fixture: ComponentFixture<MultiplyTwoByTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplyTwoByTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplyTwoByTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
