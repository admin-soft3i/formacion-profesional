import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stests } from './stests';

describe('Stests', () => {
  let component: Stests;
  let fixture: ComponentFixture<Stests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
