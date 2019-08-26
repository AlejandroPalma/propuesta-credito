import { TestBed } from '@angular/core/testing';

import { GencuadroautonomiasService } from './gencuadroautonomias.service';

describe('GencuadroautonomiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GencuadroautonomiasService = TestBed.get(GencuadroautonomiasService);
    expect(service).toBeTruthy();
  });
});
