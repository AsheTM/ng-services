import { combineLatest, from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IMediastreamCameraService } from "./mediastream-camera-service.interface";
import { AMediastreamService } from "./mediastream-service.class";


export abstract class AMediastreamCameraService
  extends AMediastreamService
  implements IMediastreamCameraService {

  protected readonly _userMedia$: Observable<MediaStream>
    = combineLatest([
      this._currentMediaDeviceSubject$
    ]).pipe(switchMap(([device]: [MediaDeviceInfo]) =>
      from(this.MEDIA_DEVICES.getUserMedia({
        audio: false,
        video: this._buildMediaConstraints(device)
      }))));

  disableCamera(): void {
    this._toggleMediaStreamSubject.next(false);
  }

  enableCamera(): void {
    this._toggleMediaStreamSubject.next(true);
  }

  toggleCamera(): void {
    const value: boolean = this._toggleMediaStreamSubject.getValue();

    this._toggleMediaStreamSubject.next(!value);
  }

  updateCameraDevice(
    device: MediaDeviceInfo & Record<'kind', 'videoinput'>
  ): void {
    this._currentMediaDeviceSubject$.next(device);
  }

}
