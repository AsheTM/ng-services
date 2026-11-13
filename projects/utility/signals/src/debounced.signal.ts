import { DestroyRef, Signal, effect, signal, untracked } from '@angular/core';

import { SignalOptions, resolveInjector } from './signal-options';


/**
 * Follows another signal, once it hasn't changed for `time` milliseconds
 */
export function debouncedSignal<T>(source: Signal<T>, time: number, options?: SignalOptions): Signal<T> {
  const injector = resolveInjector(debouncedSignal, options);
  const debounced = signal<T>(untracked(source));
  let timer: ReturnType<typeof setTimeout> | undefined;

  effect(() => {
    const value: T = source();

    clearTimeout(timer);
    timer = setTimeout(() => debounced.set(value), time);
  }, { injector });
  injector.get(DestroyRef).onDestroy(() => clearTimeout(timer));

  return debounced.asReadonly();
}
