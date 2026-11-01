import { Observable, Subscription } from 'rxjs';

import { createMicrophoneStreamMock, flushPromises } from '../mediastream.mock';
import { AMediastreamMicrophoneService } from './mediastream-microphone-service.class';

class MediastreamMicrophoneServiceTest extends AMediastreamMicrophoneService {

  readonly mediastream$: Observable<MediaStream> = this._userMedia$;

  get enabled(): boolean {
    return this._toggleMediaStreamSubject.getValue();
  }

}

describe('AMediastreamMicrophoneService', () => {
  const device = { deviceId: 'deviceId', kind: 'audioinput' } as MediaDeviceInfo & Record<'kind', 'audioinput'>;

  it('should be enabled by default', () => {
    // GIVEN
    // WHEN
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest(true);

    // THEN
    expect(service.enabled).toBeTrue();
  });

  it('should disable the microphone', () => {
    // GIVEN
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest(true);

    // WHEN
    service.disableMicrophone();

    // THEN
    expect(service.enabled).toBeFalse();
  });

  it('should enable the microphone', () => {
    // GIVEN
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest(true);
    service.disableMicrophone();

    // WHEN
    service.enableMicrophone();

    // THEN
    expect(service.enabled).toBeTrue();
  });

  it('should toggle the microphone', () => {
    // GIVEN
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest(true);

    // WHEN
    service.toggleMicrophone();
    const afterFirstToggle: boolean = service.enabled;
    service.toggleMicrophone();

    // THEN
    expect(afterFirstToggle).toBeFalse();
    expect(service.enabled).toBeTrue();
  });

  it('should emit the updated microphone device', () => {
    // GIVEN
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest(true);
    const devices: (MediaDeviceInfo | null)[] = [];
    service.currentMediaDevice$.subscribe((value: MediaDeviceInfo | null) => devices.push(value));

    // WHEN
    service.updateMicrophoneDevice(device);

    // THEN
    expect(devices).toEqual([null, device]);
  });

  it('should open the microphone only', async () => {
    // GIVEN
    const getUserMedia: jasmine.Spy = spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createMicrophoneStreamMock()));
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest({ echoCancellation: true });

    // WHEN
    const subscription: Subscription = service.mediastream$.subscribe();
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledOnceWith({ audio: { echoCancellation: true }, video: false });

    subscription.unsubscribe();
  });

  it('should open the chosen microphone device', async () => {
    // GIVEN
    const getUserMedia: jasmine.Spy = spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createMicrophoneStreamMock()));
    const service: MediastreamMicrophoneServiceTest = new MediastreamMicrophoneServiceTest(true);
    const subscription: Subscription = service.mediastream$.subscribe();
    await flushPromises();

    // WHEN
    service.updateMicrophoneDevice(device);
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledWith({ audio: { deviceId: 'deviceId' }, video: false });

    subscription.unsubscribe();
  });
});
