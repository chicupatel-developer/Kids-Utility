import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroceryComponent } from './my-grocery.component';

describe('MyGroceryComponent', () => {
  let component: MyGroceryComponent;
  let fixture: ComponentFixture<MyGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGroceryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
