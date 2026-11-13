import { Nullable } from "@ashetm/types";
import { BehaviorSubject, Observable } from "rxjs";

import { AMediastream } from "./mediastream.class";


export abstract class AMediastreamDevice extends AMediastream {

  protected readonly _currentMediaDeviceSubject$: BehaviorSubject<Nullable<MediaDeviceInfo>>
    = new BehaviorSubject<Nullable<MediaDeviceInfo>>(null);
  readonly currentMediaDevice$: Observable<Nullable<MediaDeviceInfo>>
    = this._currentMediaDeviceSubject$;

}
