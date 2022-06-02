import { TestBed } from '@angular/core/testing';

import { MarketingManagerService } from './marketing-manager.service';

describe('MarketingManagerService', () => {
  let service: MarketingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
