import { IMediastreamCameraDevice } from "./mediastream-camera-device.interface";


export interface IMediastreamCameraService extends IMediastreamCameraDevice {

  disableCamera(): void;
  enableCamera(): void;
  toggleCamera(): void;

}
