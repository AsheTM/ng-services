import { BehaviorSubject, Observable } from "rxjs";

import { AMediastreamDevice } from "./mediastream-device.class";


export abstract class AMediastreamService extends AMediastreamDevice {

  abstract readonly mediastream$: Observable<MediaStream>;

  protected readonly _toggleMediaStreamSubject: BehaviorSubject<boolean>
    = new BehaviorSubject<boolean>(true);

  get mediastreamConstraints(): boolean | MediaTrackConstraints {
    return this._mediaConstraints;
  }

  constructor(
    protected readonly _mediaConstraints: boolean | MediaTrackConstraints
  ) {
    super();
  }

  protected _buildMediaConstraints(
    device: MediaDeviceInfo | null
  ): boolean | MediaTrackConstraints {
    switch (true) {
      case device && typeof this._mediaConstraints === 'object':
        return {
          ...this._mediaConstraints as MediaTrackConstraints,
          deviceId: (device as MediaDeviceInfo).deviceId
        };
      case device
        && typeof this._mediaConstraints === 'boolean'
          && this._mediaConstraints:
        return {
          deviceId: (device as MediaDeviceInfo).deviceId
        };
      case device
        && typeof this._mediaConstraints === 'boolean'
          && !this._mediaConstraints:
        return this._mediaConstraints as false;

      default:
        return {
          ...this._mediaConstraints as MediaTrackConstraints
        };
    }
  }

}
