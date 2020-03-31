import { TestBed } from '@angular/core/testing';

import { DonacionService } from './donacion.service';

describe('DonacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonacionService = TestBed.get(DonacionService);
    expect(service).toBeTruthy();
  });
});
