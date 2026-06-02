import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTests } from './subject-tests';

describe('SubjectTests', () => {
  let component: SubjectTests;
  let fixture: ComponentFixture<SubjectTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectTests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectTests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
