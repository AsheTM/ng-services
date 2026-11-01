import { makeEnvironmentProviders } from '@angular/core';

import { MediastreamService } from './services';


export const provideMediaStream = () => {
  return makeEnvironmentProviders([MediastreamService]);
}
