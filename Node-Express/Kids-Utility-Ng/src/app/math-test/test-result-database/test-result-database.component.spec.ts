import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultDatabaseComponent } from './test-result-database.component';

describe('TestResultDatabaseComponent', () => {
  let component: TestResultDatabaseComponent;
  let fixture: ComponentFixture<TestResultDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResultDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
