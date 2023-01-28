import { TestBed } from '@angular/core/testing';

import { NgUtilityService } from './ng-utility.service';

describe('NgUtilityService', () => {
  let service: NgUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
