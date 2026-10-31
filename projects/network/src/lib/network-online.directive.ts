import { Directive, TemplateRef, ViewContainerRef, inject, DestroyRef } from "@angular/core";
import { Subscription } from "rxjs";

import { fromNetworkEvents } from "./network.rxjs";

@Directive({
  selector: '[ashetmNetworkOnline]'
})
export class NetworkOnlineDirective {
  private readonly _templateRef: TemplateRef<never> = inject(TemplateRef) as TemplateRef<never>;
  private readonly _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  constructor() {
    const subscription: Subscription = fromNetworkEvents().subscribe((isOnline: boolean) => {
      if (isOnline) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      } else {
        this._viewContainerRef.clear();
      }
    });

    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
  }
}
