import { TestBed } from '@angular/core/testing';

import { FianzaService } from './fianza.service';

describe('FianzaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FianzaService = TestBed.get(FianzaService);
    expect(service).toBeTruthy();
  });
});
