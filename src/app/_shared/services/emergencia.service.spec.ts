import { TestBed } from '@angular/core/testing';

import { EmergenciaService } from './emergencia.service';

describe('EmergenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmergenciaService = TestBed.get(EmergenciaService);
    expect(service).toBeTruthy();
  });
});
