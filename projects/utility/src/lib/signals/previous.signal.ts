import { Signal, linkedSignal } from '@angular/core';


/**
 * The value the source had before its last change (`undefined` at first).
 * Like `computed`, it's lazy: changes made between two reads count as one.
 */
export function previousSignal<T>(source: Signal<T>): Signal<T | undefined> {
  return linkedSignal<T, T | undefined>({
    source,
    computation: (_value: T, previous?: { source: T, value: T | undefined }) => previous?.source
  }).asReadonly();
}
