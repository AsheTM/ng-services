import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { AMediastreamMicrophoneService } from '../classes';
import { MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS } from '../mediastream.token';


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

  constructor() {
    super(inject(MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS));
  }

}
