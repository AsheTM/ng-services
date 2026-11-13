import { DestroyRef, Signal, signal } from '@angular/core';
import { isBrowser } from '@ashetm/platform';

import { SignalOptions, resolveInjector } from './signal-options';


/**
 * `true` while the media query matches (e.g. `'(max-width: 600px)'`). On the server, it's `false`.
 */
export function mediaQuerySignal(query: string, options?: SignalOptions): Signal<boolean> {
  const injector = resolveInjector(mediaQuerySignal, options);

  if (!isBrowser() || typeof matchMedia === 'undefined') {
    return signal(false).asReadonly();
  }

  const mediaQueryList: MediaQueryList = matchMedia(query);
  const matches = signal<boolean>(mediaQueryList.matches);
  const listener = (event: MediaQueryListEvent) => matches.set(event.matches);

  mediaQueryList.addEventListener('change', listener);
  injector.get(DestroyRef).onDestroy(() => mediaQueryList.removeEventListener('change', listener));

  return matches.asReadonly();
}
