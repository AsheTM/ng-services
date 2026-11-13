import { DestroyRef, NgZone, Signal, signal } from '@angular/core';
import { isBrowser } from '@ashetm/platform';

import { SignalOptions, resolveInjector } from './signal-options';


/**
 * The current time (`Date.now()`), updated every `every` milliseconds.
 * On the server, it isn't updated (so the app can become stable).
 */
export function nowSignal(every: number = 60_000, options?: SignalOptions): Signal<number> {
  const injector = resolveInjector(nowSignal, options);
  const now = signal<number>(Date.now());

  if (!isBrowser()) {
    return now.asReadonly();
  }

  // Outside Angular: a running interval would keep zone.js apps from being stable
  const interval: ReturnType<typeof setInterval> = injector.get(NgZone).runOutsideAngular(() => setInterval(() => now.set(Date.now()), every));

  injector.get(DestroyRef).onDestroy(() => clearInterval(interval));

  return now.asReadonly();
}
