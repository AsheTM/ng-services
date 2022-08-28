import { InjectionToken } from '@angular/core';


export const MEDIASTREAM_TOKEN_CAMERA_CONSTRAINTS: InjectionToken<boolean | MediaStreamConstraints>
  = new InjectionToken<boolean | MediaStreamConstraints>('MEDIASTREAM_CAMERA_CONSTRAINTS');
export const MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS: InjectionToken<boolean | MediaStreamConstraints>
  = new InjectionToken<boolean | MediaStreamConstraints>('MEDIASTREAM_MICROPHONE_CONSTRAINTS');
