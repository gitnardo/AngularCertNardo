import { TestBed } from '@angular/core/testing';

import { TrackingdataService } from './trackingdata.service';

describe('TrackingdataService', () => {
  let service: TrackingdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
