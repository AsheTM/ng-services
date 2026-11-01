import { TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';

import { AMediastreamService } from './mediastream-service.class';
import {
  MediaStreamServiceMock,
  MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK
} from '../mediastream.mock';

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

class MediastreamServiceTest extends AMediastreamService {

  readonly mediastream$: Observable<MediaStream> = EMPTY;

  buildMediaConstraints(device: MediaDeviceInfo | null): boolean | MediaTrackConstraints {
    return this._buildMediaConstraints(device);
  }

}

describe('AMediastreamService _buildMediaConstraints', () => {
  const device = { deviceId: 'deviceId', kind: 'videoinput' } as MediaDeviceInfo;

  it('should add the device id to the track constraints', () => {
    // GIVEN
    const service: MediastreamServiceTest = new MediastreamServiceTest({ width: 640 });

    // WHEN
    const constraints: boolean | MediaTrackConstraints = service.buildMediaConstraints(device);

    // THEN
    expect(constraints).toEqual({ width: 640, deviceId: 'deviceId' });
  });

  it('should use only the device id when constraints are true', () => {
    // GIVEN
    const service: MediastreamServiceTest = new MediastreamServiceTest(true);

    // WHEN
    const constraints: boolean | MediaTrackConstraints = service.buildMediaConstraints(device);

    // THEN
    expect(constraints).toEqual({ deviceId: 'deviceId' });
  });

  it('should keep false when constraints are false', () => {
    // GIVEN
    const service: MediastreamServiceTest = new MediastreamServiceTest(false);

    // WHEN
    const constraints: boolean | MediaTrackConstraints = service.buildMediaConstraints(device);

    // THEN
    expect(constraints).toBeFalse();
  });

  it('should copy the track constraints when no device is chosen', () => {
    // GIVEN
    const trackConstraints: MediaTrackConstraints = { width: 640 };
    const service: MediastreamServiceTest = new MediastreamServiceTest(trackConstraints);

    // WHEN
    const constraints: boolean | MediaTrackConstraints = service.buildMediaConstraints(null);

    // THEN
    expect(constraints).toEqual(trackConstraints);
    expect(constraints).not.toBe(trackConstraints);
  });

  it('should request any device when constraints are true and no device is chosen', () => {
    // GIVEN
    const service: MediastreamServiceTest = new MediastreamServiceTest(true);

    // WHEN
    const constraints: boolean | MediaTrackConstraints = service.buildMediaConstraints(null);

    // THEN
    expect(constraints).toEqual({});
  });
});
