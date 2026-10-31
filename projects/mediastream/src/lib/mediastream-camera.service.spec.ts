import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { MediastreamCameraService } from './mediastream-camera.service';
import { createCameraStreamMock, flushPromises } from './mediastream.mock';
import { MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS } from './mediastream.token';

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
    cameraStream = createCameraStreamMock();
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

describe('MediastreamCameraService release', () => {
  let service: MediastreamCameraService;

  beforeEach(() => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createCameraStreamMock()));
    TestBed.configureTestingModule({
      providers: [
        MediastreamCameraService,
        { provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS, useValue: true }
      ]
    });
    service = TestBed.inject(MediastreamCameraService);
  });

  it('should stop the tracks when unsubscribed', async () => {
    // GIVEN
    const mediastreams: MediaStream[] = [];
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => mediastreams.push(mediastream));
    await flushPromises();

    // WHEN
    subscription.unsubscribe();

    // THEN
    expect(mediastreams.length).toBe(1);
    expect(mediastreams[0].getVideoTracks()[0].readyState).toBe('ended');
  });

  it('should stop the previous tracks when the device changes', async () => {
    // GIVEN
    const mediastreams: MediaStream[] = [];
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => mediastreams.push(mediastream));
    await flushPromises();

    // WHEN
    service.updateCameraDevice({ deviceId: 'deviceId', kind: 'videoinput' } as MediaDeviceInfo & Record<'kind', 'videoinput'>);
    await flushPromises();

    // THEN
    expect(mediastreams.length).toBe(2);
    expect(mediastreams[0].getVideoTracks()[0].readyState).toBe('ended');
    expect(mediastreams[1].getVideoTracks()[0].readyState).toBe('live');

    subscription.unsubscribe();
  });
});

describe('MediastreamCameraService sharing', () => {
  let service: MediastreamCameraService;
  let getUserMedia: jasmine.Spy;

  beforeEach(() => {
    getUserMedia = spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createCameraStreamMock()));
    TestBed.configureTestingModule({
      providers: [
        MediastreamCameraService,
        { provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS, useValue: true }
      ]
    });
    service = TestBed.inject(MediastreamCameraService);
  });

  it('should share one stream between subscribers', async () => {
    // GIVEN
    const first: MediaStream[] = [];
    const second: MediaStream[] = [];

    // WHEN
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => first.push(mediastream));
    subscription.add(service.mediastream$.subscribe((mediastream: MediaStream) => second.push(mediastream)));
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(second[0]).toBe(first[0]);

    subscription.unsubscribe();
  });

  it('should give the current stream to a late subscriber', async () => {
    // GIVEN
    const first: MediaStream[] = [];
    const late: MediaStream[] = [];
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => first.push(mediastream));
    await flushPromises();

    // WHEN
    subscription.add(service.mediastream$.subscribe((mediastream: MediaStream) => late.push(mediastream)));

    // THEN
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(late[0]).toBe(first[0]);

    subscription.unsubscribe();
  });

  it('should open a new stream after every subscriber unsubscribed', async () => {
    // GIVEN
    const mediastreams: MediaStream[] = [];
    service.mediastream$.subscribe((mediastream: MediaStream) => mediastreams.push(mediastream)).unsubscribe();
    await flushPromises();

    // WHEN
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => mediastreams.push(mediastream));
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledTimes(2);
    expect(mediastreams.length).toBe(1);
    expect(mediastreams[0].getVideoTracks()[0].readyState).toBe('live');

    subscription.unsubscribe();
  });
});
