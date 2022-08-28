import { Inject, InjectionToken } from "@angular/core";
import { Observable, of } from "rxjs";

import { AMediastreamService } from "./mediastream-service.class";


export const MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK: InjectionToken<boolean | MediaTrackConstraints>
  = new InjectionToken<boolean | MediaTrackConstraints>('MEDIASTREAM_CONSTRAINTS_MOCK');

export class MediaStreamServiceMock extends AMediastreamService {

  mediastream$: Observable<MediaStream> = of(new MediaStream());

  constructor(
    @Inject(MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK)
      private readonly __mediaConstraints: boolean | MediaTrackConstraints
  ) {
    super(__mediaConstraints);
  }

}
