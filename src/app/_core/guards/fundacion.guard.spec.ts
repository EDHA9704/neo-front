import { TestBed, async, inject } from '@angular/core/testing';

import { FundacionGuard } from './fundacion.guard';

describe('FundacionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundacionGuard]
    });
  });

  it('should ...', inject([FundacionGuard], (guard: FundacionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
