import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AppContextService } from './app-context.service';
import { AppService } from './app.service';


@Component({
  selector: 'sample-broadcast-channel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AppService,
    AppContextService
  ]
})
export class AppComponent {

  readonly data$: Observable<string> = this._appService.dataApp$;
  readonly newContext$: Observable<boolean> = this._appOpeningService.newContextAppContext$;

  get origin(): string {
    return window.location.origin;
  }

  constructor(
    private readonly _appService: AppService,
    private readonly _appOpeningService: AppContextService
  ) { }

  onClickEventHandler(): void {
    this._appService.emit('You clicked in other tab');
  }

  onKeyupEventHandler($event: any): void {
    this._appService.emit('You wrote elsewhere that: ' + $event.target.value);
  }

}
