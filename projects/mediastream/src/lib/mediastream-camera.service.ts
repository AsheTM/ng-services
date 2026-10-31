import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { AMediastreamCameraService } from './mediastream-camera-service.class';
import { MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS } from './mediastream.token';


@Injectable()
export class MediastreamCameraService extends AMediastreamCameraService {

  readonly mediastream$: Observable<MediaStream>
    = combineLatest([
      this._toggleMediaStreamSubject.asObservable(),
      this._userMedia$
    ]).pipe(map(([toggleCamera, media]: [boolean, MediaStream]) => {
      media.getVideoTracks()
        .map((track: MediaStreamTrack) => {
          track.enabled = toggleCamera;

          return track;
        });

      return media;
    }));

  constructor() {
    super(inject(MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS));
  }

}
