import { TestBed } from '@angular/core/testing';

import { AdopcionService } from './adopcion.service';

describe('AdopcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdopcionService = TestBed.get(AdopcionService);
    expect(service).toBeTruthy();
  });
});
