import { IMediastreamMicrophoneDevice } from "./mediastream-microphone-device.interface";


export interface IMediastreamMicrophoneService extends IMediastreamMicrophoneDevice {

  disableMicrophone(): void;
  enableMicrophone(): void;
  toggleMicrophone(): void;

}
