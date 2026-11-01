import { BehaviorSubject, Observable } from "rxjs";

import { AMediastream } from "./mediastream.class";


export abstract class AMediastreamDevice extends AMediastream {

  protected readonly _currentMediaDeviceSubject$: BehaviorSubject<MediaDeviceInfo | null>
    = new BehaviorSubject<MediaDeviceInfo | null>(null);
  readonly currentMediaDevice$: Observable<MediaDeviceInfo | null>
    = this._currentMediaDeviceSubject$;

}
