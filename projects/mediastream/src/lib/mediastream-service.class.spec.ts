import { TestBed } from '@angular/core/testing';

import { AMediastreamService } from './mediastream-service.class';
import {
  MediaStreamServiceMock,
  MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK
} from './mediastream-service.class.mock';

describe('AMediastreamService', () => {
  let mediastreamConstraints: boolean | MediaTrackConstraints;
  let service: AMediastreamService;

  beforeEach(() => {
    const MEDIASTREAM_CONSTRAINTS_MOCK_VALUE: boolean = true;
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AMediastreamService,
          useClass: MediaStreamServiceMock
        }, {
          provide: MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK,
          useValue: MEDIASTREAM_CONSTRAINTS_MOCK_VALUE
        }
      ]
    });
    mediastreamConstraints = TestBed.inject(MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK);
    service = TestBed.inject(AMediastreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.currentMediaDevice$).toBeTruthy();
    expect(service.mediastream$).toBeTruthy();
    expect(service.mediastreamConstraints).toBeTruthy();
  });

  it('should get media constraints', () => {
    expect(service.mediastreamConstraints).toEqual(mediastreamConstraints);
  });
});
