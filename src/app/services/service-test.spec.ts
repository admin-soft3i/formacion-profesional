import { TestBed } from '@angular/core/testing';

import { ServiceTest } from '../service-test';

describe('ServiceTest', () => {
  let service: ServiceTest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
