import { TestBed } from '@angular/core/testing';

import { FundacionService } from './fundacion.service';

describe('FundacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundacionService = TestBed.get(FundacionService);
    expect(service).toBeTruthy();
  });
});
