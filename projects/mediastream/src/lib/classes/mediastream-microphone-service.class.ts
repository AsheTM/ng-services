import { combineLatest, Observable, shareReplay, switchMap } from "rxjs";

import { IMediastreamMicrophoneService } from "../interfaces";
import { AMediastreamService } from "./mediastream-service.class";


export abstract class AMediastreamMicrophoneService
  extends AMediastreamService
  implements IMediastreamMicrophoneService {

  protected readonly _userMedia$: Observable<MediaStream>
    = combineLatest([
      this._currentMediaDeviceSubject$
    ]).pipe(switchMap(([device]: [MediaDeviceInfo | null]) =>
      this._getUserMedia({
        audio: this._buildMediaConstraints(device),
        video: false
      })),
    shareReplay({ bufferSize: 1, refCount: true }));

  disableMicrophone(): void {
    this._toggleMediaStreamSubject.next(false);
  }

  enableMicrophone(): void {
    this._toggleMediaStreamSubject.next(true);
  }

  toggleMicrophone(): void {
    const value: boolean = this._toggleMediaStreamSubject.getValue();

    this._toggleMediaStreamSubject.next(!value);
  }

  updateMicrophoneDevice(
    device: MediaDeviceInfo & Record<'kind', 'audioinput'>
  ): void {
    this._currentMediaDeviceSubject$.next(device);
  }

}
