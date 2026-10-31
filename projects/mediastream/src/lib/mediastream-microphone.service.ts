import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { AMediastreamMicrophoneService } from './mediastream-microphone-service.class';
import { MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS } from './mediastream.token';


@Injectable()
export class MediastreamMicrophoneService extends AMediastreamMicrophoneService {

  readonly mediastream$: Observable<MediaStream>
    = combineLatest([
      this._toggleMediaStreamSubject.asObservable(),
      this._userMedia$
    ]).pipe(map(([toggleMicrophone, media]: [boolean, MediaStream]) => {
      media.getAudioTracks()
        .map((track: MediaStreamTrack) => {
          track.enabled = toggleMicrophone;

          return track;
        });

      return media;
    }));

  constructor(
    @Inject(MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS)
      private readonly __mediastreamMicrophoneConstraints: boolean | MediaTrackConstraints
  ) {
    super(__mediastreamMicrophoneConstraints);
  }

}
