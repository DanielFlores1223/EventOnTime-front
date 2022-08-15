import { TestBed } from '@angular/core/testing';

import { StadisticService } from './stadistic.service';

describe('StadisticService', () => {
  let service: StadisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StadisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
