import { Directive, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { Observable } from "rxjs";

import { fromNetworkEvents, fromNetworkLastTimeConnected } from "./network.rxjs";

@Directive({
  selector: '[ashetmNetwork]',
  standalone: true
})
export class NetworkDirective {
  private readonly _templateRef: TemplateRef<{
    $implicit: Observable<boolean>,
    lastTimeConnected$: Observable<number | undefined>,
  }> = inject(TemplateRef);
  private readonly _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  constructor() {
    this._viewContainerRef.createEmbeddedView(this._templateRef, {
      $implicit: fromNetworkEvents(),
      lastTimeConnected$: fromNetworkLastTimeConnected()
    });
  }
}
