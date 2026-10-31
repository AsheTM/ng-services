import { TestBed } from '@angular/core/testing';

import { MediastreamCameraMicrophoneService } from './mediastream-camera-microphone.service';
import { MediastreamCameraService } from './mediastream-camera.service';
import { MediastreamMicrophoneService } from './mediastream-microphone.service';
import {
  MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
  MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS
} from './mediastream.token';

describe('MediastreamCameraMicrophoneService', () => {
  let service: MediastreamCameraMicrophoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediastreamCameraMicrophoneService,
        MediastreamCameraService,
        MediastreamMicrophoneService,
        { provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS, useValue: true },
        { provide: MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS, useValue: true }
      ]
    });
    service = TestBed.inject(MediastreamCameraMicrophoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
