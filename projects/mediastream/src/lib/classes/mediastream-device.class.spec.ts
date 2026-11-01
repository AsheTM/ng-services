import { AMediastreamDevice } from './mediastream-device.class';

class MediastreamDeviceTest extends AMediastreamDevice {

  updateDevice(device: MediaDeviceInfo | null): void {
    this._currentMediaDeviceSubject$.next(device);
  }

}

describe('AMediastreamDevice', () => {
  const device = { deviceId: 'deviceId', kind: 'videoinput' } as MediaDeviceInfo;

  it('should emit null when no device is chosen', () => {
    // GIVEN
    const mediastreamDevice: MediastreamDeviceTest = new MediastreamDeviceTest();
    const devices: (MediaDeviceInfo | null)[] = [];

    // WHEN
    mediastreamDevice.currentMediaDevice$.subscribe((value: MediaDeviceInfo | null) => devices.push(value));

    // THEN
    expect(devices).toEqual([null]);
  });

  it('should emit the chosen device', () => {
    // GIVEN
    const mediastreamDevice: MediastreamDeviceTest = new MediastreamDeviceTest();
    const devices: (MediaDeviceInfo | null)[] = [];
    mediastreamDevice.currentMediaDevice$.subscribe((value: MediaDeviceInfo | null) => devices.push(value));

    // WHEN
    mediastreamDevice.updateDevice(device);

    // THEN
    expect(devices).toEqual([null, device]);
  });

  it('should give the current device to a late subscriber', () => {
    // GIVEN
    const mediastreamDevice: MediastreamDeviceTest = new MediastreamDeviceTest();
    mediastreamDevice.updateDevice(device);
    const devices: (MediaDeviceInfo | null)[] = [];

    // WHEN
    mediastreamDevice.currentMediaDevice$.subscribe((value: MediaDeviceInfo | null) => devices.push(value));

    // THEN
    expect(devices).toEqual([device]);
  });
});
