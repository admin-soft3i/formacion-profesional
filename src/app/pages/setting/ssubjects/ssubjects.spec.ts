import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ssubjects } from './ssubjects';

describe('Ssubjects', () => {
  let component: Ssubjects;
  let fixture: ComponentFixture<Ssubjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ssubjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ssubjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
