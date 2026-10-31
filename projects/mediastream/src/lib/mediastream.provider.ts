import { makeEnvironmentProviders } from '@angular/core';

import { MediastreamService } from './mediastream.service';


export const provideMediaStream = () => {
  return makeEnvironmentProviders([MediastreamService]);
}
