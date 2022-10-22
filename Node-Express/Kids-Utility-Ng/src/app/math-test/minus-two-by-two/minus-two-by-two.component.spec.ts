import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusTwoByTwoComponent } from './minus-two-by-two.component';

describe('MinusTwoByTwoComponent', () => {
  let component: MinusTwoByTwoComponent;
  let fixture: ComponentFixture<MinusTwoByTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinusTwoByTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinusTwoByTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
