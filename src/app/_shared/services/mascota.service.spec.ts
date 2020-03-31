import { TestBed } from '@angular/core/testing';

import { MascotaService } from './mascota.service';

describe('MascotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MascotaService = TestBed.get(MascotaService);
    expect(service).toBeTruthy();
  });
});
