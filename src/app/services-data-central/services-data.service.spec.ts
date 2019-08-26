import { TestBed } from '@angular/core/testing';

import { ServicesDataService } from './services-data.service';

describe('ServicesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesDataService = TestBed.get(ServicesDataService);
    expect(service).toBeTruthy();
  });
});
