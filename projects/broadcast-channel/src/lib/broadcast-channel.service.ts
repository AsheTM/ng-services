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
    if (this._broadcastChannels[name]) {
      return this._broadcastChannels[name];
    }

    // A closed channel is forgotten, so the next `create(name)` opens a new one
    const broadcastChannel: BroadcastChannelRef<T> = new BroadcastChannelRef<T>(this._ngZone, name, () => {
      if (this._broadcastChannels[name] === broadcastChannel) {
        delete this._broadcastChannels[name];
      }
    });

    return this._broadcastChannels[name] = broadcastChannel;
  }

  get<T>(name: string): BroadcastChannelRef<T> | null {
    return this._broadcastChannels[name];
  }

}
