import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, mapTo, tap } from 'rxjs/operators';

import { BroadcastChannelRef, BroadcastChannelService } from 'broadcast-channel';


@Injectable()
export class AppContextService {

  readonly newContextAppContext$: Observable<boolean>;

  constructor(private readonly _broadcastChannelService: BroadcastChannelService) {
    const broadcastChannelAppContext: BroadcastChannelRef<void>
      = this._broadcastChannelService.create('OPENING');

    this.newContextAppContext$ = broadcastChannelAppContext.data$
      .pipe(
        tap(() => broadcastChannelAppContext.send()),
        tap(() => broadcastChannelAppContext.close()),
        first(),
        mapTo(true)
      );
    broadcastChannelAppContext.send();
  }

}
