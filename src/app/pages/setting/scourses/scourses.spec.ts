import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scourses } from './scourses';

describe('Scourses', () => {
  let component: Scourses;
  let fixture: ComponentFixture<Scourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
