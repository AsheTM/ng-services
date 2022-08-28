import { InjectFlags } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MediastreamCameraMicrophoneService } from './mediastream-camera-microphone.service';

import { MediastreamCameraService } from './mediastream-camera.service';
import { MediastreamMicrophoneService } from './mediastream-microphone.service';
import { MediastreamModule } from './mediastream.module';
import { MediastreamService } from './mediastream.service';
import {
  MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
  MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS
} from './mediastream.token';

fdescribe('MediastreamService', () => {
  const deviceMocks: MediaDeviceInfo[] = [
    {
      deviceId: 'deviceId1',
      groupId: 'groupId1',
      kind: 'audioinput',
      label: 'label1',
      toJSON() {
        return JSON.stringify(this);
      }
    }, {
      deviceId: 'deviceId2',
      groupId: 'groupId2',
      kind: 'videoinput',
      label: 'label2',
      toJSON() {
        return JSON.stringify(this);
      }
    }
  ];
  let service: MediastreamService;

  beforeAll(() => {
    spyOn(window.navigator.mediaDevices, 'enumerateDevices')
      .withArgs()
      .and
      .returnValue(new Promise((resolve: (value: MediaDeviceInfo[]) => void) =>
        resolve(deviceMocks)));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MediastreamModule]
    });
    service = TestBed.inject(MediastreamService);
  });

  it('should be created', () => {
    const tokenMediastreamCameraContrains: boolean | MediaStreamConstraints | null
      = TestBed.inject(
        MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS,
        null,
        InjectFlags.Optional
      );
    const tokenMediastreamMicrophoneContrains: boolean | MediaStreamConstraints | null
      = TestBed.inject(
        MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS,
        null,
        InjectFlags.Optional
      );

    expect(service).toBeTruthy();
    expect(tokenMediastreamCameraContrains).toBeNull();
    expect(tokenMediastreamMicrophoneContrains).toBeNull();
  });

  it('should request camera with whatever args', async () => {
    const mediaStreamConstraints: MediaStreamConstraints = {
      audio: false,
      video: true
    };
    spyOn(window.navigator.mediaDevices, 'getUserMedia')
      .withArgs(mediaStreamConstraints)
      .and
      .returnValue(new Promise((resolve: (value: MediaStream) => void) =>
        resolve(new MediaStream())));

    const mediastreamCameraService: MediastreamCameraService
      = await service.requestCamera();

    expect(mediastreamCameraService).toBeTruthy();
    expect(mediastreamCameraService).toBeInstanceOf(MediastreamCameraService);
    expect(window.navigator.mediaDevices.getUserMedia)
      .toHaveBeenCalledWith(mediaStreamConstraints);
  });

  it('should request camera and microphone with whatever args', async () => {
    const mediaStreamConstraints: MediaStreamConstraints = {
      audio: true,
      video: true
    };
    spyOn(window.navigator.mediaDevices, 'getUserMedia')
      .withArgs(mediaStreamConstraints)
      .and
      .returnValue(new Promise((resolve: (value: MediaStream) => void) =>
        resolve(new MediaStream())));

    const MediastreamCameraMicrophoneServicm: MediastreamCameraMicrophoneService
      = await service.requestCameraAndMicrophone();

    expect(MediastreamCameraMicrophoneServicm).toBeTruthy();
    expect(MediastreamCameraMicrophoneServicm)
      .toBeInstanceOf(MediastreamCameraMicrophoneService);
    expect(window.navigator.mediaDevices.getUserMedia)
      .toHaveBeenCalledWith(mediaStreamConstraints);
  });

  it('should request microphone with whatever args', async () => {
    const mediaStreamConstraints: MediaStreamConstraints = {
      audio: true,
      video: false
    };
    spyOn(window.navigator.mediaDevices, 'getUserMedia')
      .withArgs(mediaStreamConstraints)
      .and
      .returnValue(new Promise((resolve: (value: MediaStream) => void) =>
        resolve(new MediaStream())));

    const mediastreamMicrophoneService: MediastreamMicrophoneService
      = await service.requestMicrophone();

    expect(mediastreamMicrophoneService).toBeTruthy();
    expect(mediastreamMicrophoneService)
      .toBeInstanceOf(MediastreamMicrophoneService);
    expect(window.navigator.mediaDevices.getUserMedia)
      .toHaveBeenCalledWith(mediaStreamConstraints);
  });

  it('should get devices', async () => {
    const devices: MediaDeviceInfo[]
      = await service.getDevices();

    expect(devices).toBeTruthy();
    expect(devices).toHaveSize(deviceMocks.length);
    expect(devices[0]).toBeTruthy();
    expect(devices[0].deviceId).toEqual(deviceMocks[0].deviceId);
    expect(devices[0].groupId).toEqual(deviceMocks[0].groupId);
    expect(devices[0].kind).toEqual(deviceMocks[0].kind);
    expect(devices[0].label).toEqual(deviceMocks[0].label);
    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledWith();
  });

  it('should get camera devices', async () => {
    const cameraDeviceMocks: MediaDeviceInfo[]
      = deviceMocks.filter((cameraDevice: MediaDeviceInfo) =>
        cameraDevice.kind === 'videoinput');
    const cameraDevices: MediaDeviceInfo[]
      = await service.getCameraDevices();

    expect(cameraDevices).toBeTruthy();
    expect(cameraDevices).toHaveSize(cameraDeviceMocks.length);
    expect(cameraDevices[0]).toBeTruthy();
    expect(cameraDevices[0].deviceId).toEqual(cameraDeviceMocks[0].deviceId);
    expect(cameraDevices[0].groupId).toEqual(cameraDeviceMocks[0].groupId);
    expect(cameraDevices[0].kind).toEqual(cameraDeviceMocks[0].kind);
    expect(cameraDevices[0].label).toEqual(cameraDeviceMocks[0].label);
    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledWith();
  });

  it('should get microphone devices', async () => {
    const microphoneDeviceMocks: MediaDeviceInfo[]
      = deviceMocks.filter((microphoneDevice: MediaDeviceInfo) =>
        microphoneDevice.kind === 'audioinput');
    const microphoneDevices: MediaDeviceInfo[]
      = await service.getMicrophoneDevices();

    expect(microphoneDevices).toBeTruthy();
    expect(microphoneDevices).toHaveSize(microphoneDeviceMocks.length);
    expect(microphoneDevices[0]).toBeTruthy();
    expect(microphoneDevices[0].deviceId).toEqual(microphoneDeviceMocks[0].deviceId);
    expect(microphoneDevices[0].groupId).toEqual(microphoneDeviceMocks[0].groupId);
    expect(microphoneDevices[0].kind).toEqual(microphoneDeviceMocks[0].kind);
    expect(microphoneDevices[0].label).toEqual(microphoneDeviceMocks[0].label);
    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledWith();
  });

  it('should has some camera devices', async () => {
    const hasCameraDeviceMocks: boolean
      = deviceMocks.filter((cameraDevice: MediaDeviceInfo) =>
        cameraDevice.kind === 'videoinput').length !== 0;
    const hasCameraDevices: boolean
      = await service.hasCameraDevices();

    expect(hasCameraDevices).toBeTrue();
    expect(hasCameraDevices).toEqual(hasCameraDeviceMocks);
    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledWith();
  });

  it('should has some microphone devices', async () => {
    const hasMicrophoneDeviceMocks: boolean
      = deviceMocks.filter((microphoneDevice: MediaDeviceInfo) =>
        microphoneDevice.kind === 'audioinput').length !== 0;
    const hasMicrophoneDevices: boolean
      = await service.hasMicrophoneDevices();

    expect(hasMicrophoneDevices).toBeTrue();
    expect(hasMicrophoneDevices).toEqual(hasMicrophoneDeviceMocks);
    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledWith();
  });
});
