import { combineLatest, Observable, shareReplay, switchMap } from "rxjs";

import { IMediastreamCameraService } from "./mediastream-camera-service.interface";
import { AMediastreamService } from "./mediastream-service.class";


export abstract class AMediastreamCameraService
  extends AMediastreamService
  implements IMediastreamCameraService {

  protected readonly _userMedia$: Observable<MediaStream>
    = combineLatest([
      this._currentMediaDeviceSubject$
    ]).pipe(switchMap(([device]: [MediaDeviceInfo]) =>
      this._getUserMedia({
        audio: false,
        video: this._buildMediaConstraints(device)
      })),
    shareReplay({ bufferSize: 1, refCount: true }));

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
