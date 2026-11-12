import { Observable, OperatorFunction, map } from "rxjs";

/**
 * Reads `key` of each value (`undefined` for `null` / `undefined` values). Replaces RxJS's deprecated `pluck`.
 */
export function pick<T, K extends keyof T>(key: K): OperatorFunction<T | null | undefined, T[K] | undefined> {
  return (source$: Observable<T | null | undefined>) => source$.pipe(map((value: T | null | undefined) => value?.[key]));
}
