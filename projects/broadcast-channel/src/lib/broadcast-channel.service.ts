import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';

import { BroadcastChannelRef } from './broadcast-channel.ref';


@Injectable()
export class BroadcastChannelService implements OnDestroy {

  private readonly _broadcastChannels: Record<string, BroadcastChannelRef<unknown>>
    = { };
  private readonly _ngZone: NgZone = inject(NgZone);

  ngOnDestroy(): void {
    Object.values(this._broadcastChannels)
      .forEach((broadcastChannel: BroadcastChannelRef<unknown>) => broadcastChannel.close());
  }

  create<T>(name: string): BroadcastChannelRef<T> {
    // A closed channel is replaced by a new one
    return this.get<T>(name)
      ?? (this._broadcastChannels[name] = new BroadcastChannelRef<T>(this._ngZone, name));
  }

  get<T>(name: string): BroadcastChannelRef<T> | null {
    const broadcastChannel: BroadcastChannelRef<unknown> | undefined = this._broadcastChannels[name];

    // The same type `T` is expected for a given channel name (see README)
    return broadcastChannel && !broadcastChannel.closed
      ? broadcastChannel as BroadcastChannelRef<T>
      : null;
  }

}
