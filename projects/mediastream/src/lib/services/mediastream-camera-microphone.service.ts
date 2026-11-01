import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { IMediastreamCameraService } from '../interfaces';
import { MediastreamCameraService } from './mediastream-camera.service';
import { IMediastreamMicrophoneService } from '../interfaces';
import { MediastreamMicrophoneService } from './mediastream-microphone.service';


@Injectable()
export class MediastreamCameraMicrophoneService
  implements IMediastreamCameraService, IMediastreamMicrophoneService {

  private readonly _mediastreamCameraService: MediastreamCameraService = inject(MediastreamCameraService);
  private readonly _mediastreamMicrophoneService: MediastreamMicrophoneService = inject(MediastreamMicrophoneService);

  readonly currentCameraMediaDevice$: Observable<MediaDeviceInfo | null>
    = this._mediastreamCameraService.currentMediaDevice$;

  readonly currentMicrophoneMediaDevice$: Observable<MediaDeviceInfo | null>
    = this._mediastreamMicrophoneService.currentMediaDevice$;

  readonly mediastream$: Observable<MediaStream>
    = combineLatest([
      this._mediastreamCameraService.mediastream$,
      this._mediastreamMicrophoneService.mediastream$
    ]).pipe(map(([mediastreamCamera, mediastreamMicrophone]: [MediaStream, MediaStream]) => {
      const mediastreamCameraTracks: MediaStreamTrack[] = mediastreamCamera.getVideoTracks();
      const mediastreamMicrophoneTracks: MediaStreamTrack[] = mediastreamMicrophone.getAudioTracks();
      const mediastreamTracks: MediaStreamTrack[] = [
        ...mediastreamCameraTracks,
        ...mediastreamMicrophoneTracks
      ];

      return new MediaStream(mediastreamTracks);
    }));

  get mediastreamCameraConstraints(): boolean | MediaTrackConstraints {
    return this._mediastreamCameraService.mediastreamConstraints;
  }

  get mediastreamMicrophoneConstraints(): boolean | MediaTrackConstraints {
    return this._mediastreamMicrophoneService.mediastreamConstraints;
  }

  disableCamera(): void {
    this._mediastreamCameraService.disableCamera();
  }

  disableMicrophone(): void {
    this._mediastreamMicrophoneService.disableMicrophone();
  }

  enableCamera(): void {
    this._mediastreamCameraService.enableCamera();
  }

  enableMicrophone(): void {
    this._mediastreamMicrophoneService.enableMicrophone();
  }

  toggleCamera(): void {
    this._mediastreamCameraService.toggleCamera();
  }

  toggleMicrophone(): void {
    this._mediastreamMicrophoneService.toggleMicrophone();
  }

  updateCameraDevice(device: MediaDeviceInfo & Record<'kind', 'videoinput'>): void {
    this._mediastreamCameraService.updateCameraDevice(device);
  }

  updateMicrophoneDevice(device: MediaDeviceInfo & Record<'kind', 'audioinput'>): void {
    this._mediastreamMicrophoneService.updateMicrophoneDevice(device);
  }

}
