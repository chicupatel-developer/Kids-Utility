import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusOneByTwoComponent } from './minus-one-by-two.component';

describe('MinusOneByTwoComponent', () => {
  let component: MinusOneByTwoComponent;
  let fixture: ComponentFixture<MinusOneByTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinusOneByTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinusOneByTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
