import { Directive, Signal, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { fromNetworkLastTimeConnected } from "./network.rxjs";
import { injectNetwork } from "./network.signal";

export interface NetworkDirectiveContext {
  $implicit: Signal<boolean>;
  lastTimeConnected: Signal<number | undefined>;
}

@Directive({
  selector: '[ashetmNetwork]'
})
export class NetworkDirective {
  private readonly _templateRef: TemplateRef<NetworkDirectiveContext> = inject(TemplateRef);
  private readonly _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  static ngTemplateContextGuard(_directive: NetworkDirective, context: unknown): context is NetworkDirectiveContext {
    return true;
  }

  constructor() {
    this._viewContainerRef.createEmbeddedView(this._templateRef, {
      $implicit: injectNetwork(),
      lastTimeConnected: toSignal(fromNetworkLastTimeConnected(), { initialValue: undefined })
    });
  }
}
