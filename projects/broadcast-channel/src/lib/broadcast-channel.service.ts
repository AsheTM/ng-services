import { Injectable, NgZone, OnDestroy } from '@angular/core';

import { BroadcastChannelRef } from './broadcast-channel.ref';


@Injectable()
export class BroadcastChannelService implements OnDestroy {

  private readonly _broadcastChannels: Record<string, BroadcastChannelRef<any>>
    = { };

  constructor(private readonly _ngZone: NgZone) { }

  ngOnDestroy(): void {
    Object.values(this._broadcastChannels)
      .forEach((broadcastChannel: BroadcastChannelRef<any>) => broadcastChannel.close());
  }

  create<T>(name: string): BroadcastChannelRef<T> {
    // A closed channel is replaced by a new one
    return this.get<T>(name)
      ?? (this._broadcastChannels[name] = new BroadcastChannelRef<T>(this._ngZone, name));
  }

  get<T>(name: string): BroadcastChannelRef<T> | null {
    const broadcastChannel: BroadcastChannelRef<T> | undefined = this._broadcastChannels[name];

    return broadcastChannel && !broadcastChannel.closed ? broadcastChannel : null;
  }

}
