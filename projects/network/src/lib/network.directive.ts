import { AfterViewInit, Directive, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { Observable } from "rxjs";

import { fromNetworkEvents, fromNetworkLastTimeConnected } from "./network.rxjs";

/**
 * @requires NetworkModule
 */
@Directive({
  selector: 'ashetmNetwork',
  standalone: false
})
export class NetworkDirective implements AfterViewInit {
  private readonly _templateRef: TemplateRef<{
    $implicit: Observable<boolean>,
    lastTimeConnected$: Observable<number | undefined>,
  }> = inject(TemplateRef);
  private readonly _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit(): void {
    this._viewContainerRef.createEmbeddedView(this._templateRef, {
      $implicit: fromNetworkEvents(),
      lastTimeConnected$: fromNetworkLastTimeConnected()
    });
  }
}
