import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AMediastreamCameraService } from './mediastream-camera-service.class';
import { MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS } from './mediastream.token';


@Injectable()
export class MediastreamCameraService extends AMediastreamCameraService {

  readonly mediastream$: Observable<MediaStream>
    = combineLatest([
      this._toggleMediaStreamSubject.asObservable(),
      this._userMedia$
    ]).pipe(map(([toggleCamera, media]: [boolean, MediaStream]) => {
      media.getAudioTracks()
        .map((track: MediaStreamTrack) => {
          track.enabled = toggleCamera;

          return track;
        });

      return media;
    }));

  constructor(
    @Inject(MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS)
      private readonly __mediastreamCameraConstraints: any
  ) {
    super(__mediastreamCameraConstraints);
  }

}
