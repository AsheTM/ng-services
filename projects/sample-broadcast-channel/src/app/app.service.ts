import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BroadcastChannelRef, BroadcastChannelService } from '@ashetm/ng-broadcast-channel';


@Injectable()
export class AppService {

  readonly broadcastChannelApp: BroadcastChannelRef<string>;
  readonly dataApp$: Observable<string>;

  constructor(private readonly _broadcastChannelService: BroadcastChannelService) {
    this.broadcastChannelApp = this._broadcastChannelService.create('ACTION');
    this.dataApp$ = this.broadcastChannelApp.data$;
  }

  emit(message: string): void {
    this.broadcastChannelApp.send(message);
  }

}
