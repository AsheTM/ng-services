import { TestBed } from '@angular/core/testing';

import { MediastreamCameraService } from './mediastream-camera.service';
import { MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK } from './mediastream-service.class.mock';

describe('MediastreamCameraService', () => {
  let mediastreamConstraints: boolean | MediaTrackConstraints;
  let service: MediastreamCameraService;

  beforeEach(() => {
    const MEDIASTREAM_CONSTRAINTS_MOCK_VALUE: boolean = true;
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK,
          useValue: MEDIASTREAM_CONSTRAINTS_MOCK_VALUE
        }
      ]
    });
    mediastreamConstraints = TestBed.inject(MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK);
    service = TestBed.inject(MediastreamCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.currentMediaDevice$).toBeDefined();
    expect(service.disableCamera).toBeDefined();
    expect(service.enableCamera).toBeDefined();
    expect(service.mediastream$).toBeTruthy();
    expect(service.mediastreamConstraints).toBeTruthy();
    expect(service.toggleCamera).toBeDefined();
    expect(service.updateCameraDevice).toBeDefined();
  });
});
