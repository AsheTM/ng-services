import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMediastreamCameraService } from './mediastream-camera-service.interface';
import { MediastreamCameraService } from './mediastream-camera.service';
import { IMediastreamMicrophoneService } from './mediastream-microphone-service.interface';
import { MediastreamMicrophoneService } from './mediastream-microphone.service';


@Injectable()
export class MediastreamCameraMicrophoneService
  implements IMediastreamCameraService, IMediastreamMicrophoneService {

  readonly currentCameraMediaDevice$: Observable<MediaDeviceInfo>
    = this._mediastreamCameraService.currentMediaDevice$;

  readonly currentMicrophoneMediaDevice$: Observable<MediaDeviceInfo>
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

  constructor(
    private readonly _mediastreamCameraService: MediastreamCameraService,
    private readonly _mediastreamMicrophoneService: MediastreamMicrophoneService
  ) { }

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
