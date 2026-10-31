import { InjectionToken } from '@angular/core';


export const MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS: InjectionToken<boolean | MediaTrackConstraints>
  = new InjectionToken<boolean | MediaTrackConstraints>('MEDIASTREAM_CAMERA_CONSTRAINTS');
export const MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS: InjectionToken<boolean | MediaTrackConstraints>
  = new InjectionToken<boolean | MediaTrackConstraints>('MEDIASTREAM_MICROPHONE_CONSTRAINTS');
