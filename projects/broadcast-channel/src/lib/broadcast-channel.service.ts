import { Injectable, NgZone, OnDestroy } from '@angular/core';

import { BroadcastChannelModule } from './broadcast-channel.module';
import { BroadcastChannelRef } from './broadcast-channel.ref';


@Injectable({
  providedIn: BroadcastChannelModule
})
export class BroadcastChannelService implements OnDestroy {

  private readonly _broadcastChannels: Record<string, BroadcastChannelRef<any>>
    = { };

  constructor(private readonly _ngZone: NgZone) { }

  ngOnDestroy(): void {
    for (const broadcastChannel in this._broadcastChannels) {
      this._broadcastChannels[broadcastChannel].close();
    }
  }

  create<T>(name: string): BroadcastChannelRef<T> {
    return this._broadcastChannels[name]
      || (this._broadcastChannels[name] = new BroadcastChannelRef<T>(this._ngZone, name));
  }

  get<T>(name: string): BroadcastChannelRef<T> | null {
    return this._broadcastChannels[name];
  }

}
