
export interface IMediastreamMicrophoneDevice {

  updateMicrophoneDevice(
    device: MediaDeviceInfo & Record<'kind', 'audioinput'>
  ): void;

}
