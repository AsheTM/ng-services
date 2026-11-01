import { Observable, Subscription } from 'rxjs';

import { createCameraStreamMock, flushPromises } from '../mediastream.mock';
import { AMediastreamCameraService } from './mediastream-camera-service.class';

class MediastreamCameraServiceTest extends AMediastreamCameraService {

  readonly mediastream$: Observable<MediaStream> = this._userMedia$;

  get enabled(): boolean {
    return this._toggleMediaStreamSubject.getValue();
  }

}

describe('AMediastreamCameraService', () => {
  const device = { deviceId: 'deviceId', kind: 'videoinput' } as MediaDeviceInfo & Record<'kind', 'videoinput'>;

  it('should be enabled by default', () => {
    // GIVEN
    // WHEN
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest(true);

    // THEN
    expect(service.enabled).toBeTrue();
  });

  it('should disable the camera', () => {
    // GIVEN
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest(true);

    // WHEN
    service.disableCamera();

    // THEN
    expect(service.enabled).toBeFalse();
  });

  it('should enable the camera', () => {
    // GIVEN
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest(true);
    service.disableCamera();

    // WHEN
    service.enableCamera();

    // THEN
    expect(service.enabled).toBeTrue();
  });

  it('should toggle the camera', () => {
    // GIVEN
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest(true);

    // WHEN
    service.toggleCamera();
    const afterFirstToggle: boolean = service.enabled;
    service.toggleCamera();

    // THEN
    expect(afterFirstToggle).toBeFalse();
    expect(service.enabled).toBeTrue();
  });

  it('should emit the updated camera device', () => {
    // GIVEN
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest(true);
    const devices: (MediaDeviceInfo | null)[] = [];
    service.currentMediaDevice$.subscribe((value: MediaDeviceInfo | null) => devices.push(value));

    // WHEN
    service.updateCameraDevice(device);

    // THEN
    expect(devices).toEqual([null, device]);
  });

  it('should open the camera only', async () => {
    // GIVEN
    const getUserMedia: jasmine.Spy = spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createCameraStreamMock()));
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest({ width: 640 });

    // WHEN
    const subscription: Subscription = service.mediastream$.subscribe();
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledOnceWith({ audio: false, video: { width: 640 } });

    subscription.unsubscribe();
  });

  it('should open the chosen camera device', async () => {
    // GIVEN
    const getUserMedia: jasmine.Spy = spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createCameraStreamMock()));
    const service: MediastreamCameraServiceTest = new MediastreamCameraServiceTest(true);
    const subscription: Subscription = service.mediastream$.subscribe();
    await flushPromises();

    // WHEN
    service.updateCameraDevice(device);
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledWith({ audio: false, video: { deviceId: 'deviceId' } });

    subscription.unsubscribe();
  });
});
