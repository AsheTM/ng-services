import { Injector, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { fromNetworkEvents } from "./network.rxjs";

/**
 * Must be called in an injection context, unless an `injector` is given.
 */
export function injectNetwork(options?: { injector?: Injector }): Signal<boolean> {
  return toSignal(fromNetworkEvents(), { requireSync: true, injector: options?.injector });
}
