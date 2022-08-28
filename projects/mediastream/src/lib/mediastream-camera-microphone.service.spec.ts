import { TestBed } from '@angular/core/testing';

import { MediastreamCameraMicrophoneService } from './mediastream-camera-microphone.service';

describe('MediastreamCameraMicrophoneService', () => {
  let service: MediastreamCameraMicrophoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediastreamCameraMicrophoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
