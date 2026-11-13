import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

/**
 * Reads `key` of each value (`undefined` for `null` / `undefined` values). Replaces RxJS's deprecated `pluck`.
 */
export function pick<T, K extends keyof T>(key: K): OperatorFunction<Maybe<T>, T[K] | undefined> {
  return (source$: Observable<Maybe<T>>) => source$.pipe(map((value: Maybe<T>) => value?.[key]));
}
