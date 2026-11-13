import { Injector, assertInInjectionContext, inject } from '@angular/core';


/**
 * Options of the signal helpers: without `injector`, they must be called in an injection context
 */
export interface SignalOptions {
  injector?: Injector;
}

export function resolveInjector(helper: (...args: any[]) => unknown, options?: SignalOptions): Injector {
  if (options?.injector) {
    return options.injector;
  }

  assertInInjectionContext(helper);

  return inject(Injector);
}
