import { TestBed } from '@angular/core/testing';

import { InfluencersService } from './influencers.service';

describe('InfluencersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfluencersService = TestBed.get(InfluencersService);
    expect(service).toBeTruthy();
  });
});
