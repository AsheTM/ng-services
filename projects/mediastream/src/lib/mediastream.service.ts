import { Injectable, Injector } from '@angular/core';

import { MediastreamCameraMicrophoneService } from './mediastream-camera-microphone.service';
import { MediastreamCameraService } from './mediastream-camera.service';
import { MediastreamMicrophoneService } from './mediastream-microphone.service';
import { AMediastream } from './mediastream.class';
import {
  MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
  MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS
} from './mediastream.token';
import { MediastreamModule } from './mediastream.module';


@Injectable({
  providedIn: MediastreamModule
})
export class MediastreamService extends AMediastream {

  constructor(private readonly _injector: Injector) {
    super();
  }

  async getCameraDevices(): Promise<MediaDeviceInfo[]> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === 'videoinput');
  }

  async getDevices(): Promise<MediaDeviceInfo[]> {
    return await this.MEDIA_DEVICES.enumerateDevices();
  }

  async getMicrophoneDevices(): Promise<MediaDeviceInfo[]> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === 'audioinput');
  }

  async hasCameraDevices(): Promise<boolean> {
    return (await this.getCameraDevices()).length !== 0;
  }

  async hasMicrophoneDevices(): Promise<boolean> {
    return (await this.getMicrophoneDevices()).length !== 0;
  }

  async requestCamera(
    constraints?: MediaTrackConstraints
  ): Promise<MediastreamCameraService> {
    const cameraConstraints: boolean | MediaTrackConstraints = constraints || true;
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: MediastreamCameraService,
          useClass: MediastreamCameraService
        }, {
          provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
          useValue: cameraConstraints
        }
      ],
      parent: this._injector
    });

    return await this.MEDIA_DEVICES.getUserMedia({
      audio: false,
      video: cameraConstraints
    }).then(() => injector.get(MediastreamCameraService));
  }

  async requestCameraAndMicrophone(constraints?: Partial<
    Record<'audio' | 'video', MediaTrackConstraints>
  >): Promise<MediastreamCameraMicrophoneService> {
    const cameraConstraints: boolean | MediaTrackConstraints
      = constraints?.video || true;
    const microphoneConstraints: boolean | MediaTrackConstraints
      = constraints?.audio || true;
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: MediastreamCameraService,
          useClass: MediastreamCameraService
        }, {
          provide: MediastreamCameraMicrophoneService,
          useClass: MediastreamCameraMicrophoneService
        }, {
          provide: MediastreamMicrophoneService,
          useClass: MediastreamMicrophoneService
        }, {
          provide: MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
          useValue: cameraConstraints
        }, {
          provide: MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS,
          useValue: microphoneConstraints
        }
      ],
      parent: this._injector
    });

    return await this.MEDIA_DEVICES.getUserMedia({
      audio: microphoneConstraints,
      video: cameraConstraints
    }).then(() => injector.get(MediastreamCameraMicrophoneService));
  }

  async requestMicrophone(
    constraints?: MediaTrackConstraints
  ): Promise<MediastreamMicrophoneService> {
    const microphoneConstraints: boolean | MediaTrackConstraints = constraints || true;
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: MediastreamMicrophoneService,
          useClass: MediastreamMicrophoneService
        }, {
          provide: MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS,
          useValue: microphoneConstraints
        }
      ],
      parent: this._injector
    });

    return await this.MEDIA_DEVICES.getUserMedia({
      audio: microphoneConstraints,
      video: false
    }).then(() => injector.get(MediastreamMicrophoneService));
  }

}
