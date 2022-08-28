
export interface IMediastreamCameraDevice {

  updateCameraDevice(
    device: MediaDeviceInfo & Record<'kind', 'videoinput'>
  ): void;

}
