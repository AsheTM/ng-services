import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { MediastreamCameraService } from './mediastream-camera.service';
import { MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS } from './mediastream.token';

function createCameraStream(): MediaStream {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.getContext('2d');

  return canvas.captureStream();
}

describe('MediastreamCameraService', () => {
  let service: MediastreamCameraService;

  beforeEach(() => {
    const MEDIASTREAM_CONSTRAINTS_MOCK_VALUE: boolean = true;
    TestBed.configureTestingModule({
      providers: [
        MediastreamCameraService,
        {
          provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
          useValue: MEDIASTREAM_CONSTRAINTS_MOCK_VALUE
        }
      ]
    });
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

describe('MediastreamCameraService toggle', () => {
  let service: MediastreamCameraService;
  let cameraStream: MediaStream;

  beforeEach(() => {
    cameraStream = createCameraStream();
    spyOn(navigator.mediaDevices, 'getUserMedia').and.resolveTo(cameraStream);
    TestBed.configureTestingModule({
      providers: [
        MediastreamCameraService,
        { provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS, useValue: true }
      ]
    });
    service = TestBed.inject(MediastreamCameraService);
  });

  afterEach(() => cameraStream.getTracks().forEach((track: MediaStreamTrack) => track.stop()));

  it('should disable the video track', async () => {
    // GIVEN
    service.disableCamera();

    // WHEN
    const mediastream: MediaStream = await service.mediastream$.pipe(take(1)).toPromise() as MediaStream;

    // THEN
    expect(mediastream.getVideoTracks().length).toBe(1);
    expect(mediastream.getVideoTracks()[0].enabled).toBeFalse();
  });

  it('should enable the video track', async () => {
    // GIVEN
    service.disableCamera();
    service.enableCamera();

    // WHEN
    const mediastream: MediaStream = await service.mediastream$.pipe(take(1)).toPromise() as MediaStream;

    // THEN
    expect(mediastream.getVideoTracks()[0].enabled).toBeTrue();
  });

  it('should toggle the video track', async () => {
    // GIVEN
    service.toggleCamera();

    // WHEN
    const mediastream: MediaStream = await service.mediastream$.pipe(take(1)).toPromise() as MediaStream;

    // THEN
    expect(mediastream.getVideoTracks()[0].enabled).toBeFalse();
  });
});
