import { BehaviorSubject, Observable } from "rxjs";

import { AMediastream } from "./mediastream.class";


export abstract class AMediastreamDevice extends AMediastream {

  protected readonly _currentMediaDeviceSubject$: BehaviorSubject<MediaDeviceInfo>
    = new BehaviorSubject<MediaDeviceInfo>(null as any as MediaDeviceInfo);
  readonly currentMediaDevice$: Observable<MediaDeviceInfo>
    = this._currentMediaDeviceSubject$;

}
