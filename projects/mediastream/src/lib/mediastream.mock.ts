import { Injectable, InjectionToken, inject } from "@angular/core";
import { Observable, of } from "rxjs";

import { AMediastreamService } from "./classes";


export const MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK: InjectionToken<boolean | MediaTrackConstraints>
  = new InjectionToken<boolean | MediaTrackConstraints>('MEDIASTREAM_CONSTRAINTS_MOCK');

@Injectable()
export class MediaStreamServiceMock extends AMediastreamService {

  mediastream$: Observable<MediaStream> = of(new MediaStream());

  constructor() {
    super(inject(MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK));
  }

}

export function createCameraStreamMock(): MediaStream {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.getContext('2d');

  return canvas.captureStream();
}

export function createMicrophoneStreamMock(): MediaStream {
  return new AudioContext().createMediaStreamDestination().stream;
}

export function flushPromises(): Promise<void> {
  return new Promise((resolve: () => void) => setTimeout(resolve));
}
