import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sissues } from './sissues';

describe('Sissues', () => {
  let component: Sissues;
  let fixture: ComponentFixture<Sissues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sissues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sissues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
