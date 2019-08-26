import { TestBed } from '@angular/core/testing';

import { MotivosrefinanciamientoService } from './motivosrefinanciamiento.service';

describe('MotivosrefinanciamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotivosrefinanciamientoService = TestBed.get(MotivosrefinanciamientoService);
    expect(service).toBeTruthy();
  });
});
