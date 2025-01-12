import { makeEnvironmentProviders } from "@angular/core";

import { BroadcastChannelService } from "./broadcast-channel.service";

export const provideBroadcastChannel = () => {
  return makeEnvironmentProviders([BroadcastChannelService]);
}
