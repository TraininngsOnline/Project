import { TestBed } from '@angular/core/testing';

import { MarketingManagerGuard } from './marketing-manager.guard';

describe('MarketingManagerGuard', () => {
  let guard: MarketingManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MarketingManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
