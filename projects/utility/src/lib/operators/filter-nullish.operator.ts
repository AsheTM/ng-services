import { Observable, OperatorFunction, filter } from "rxjs";

/**
 * Drops `null` and `undefined`; the result is typed as non-null
 */
export function filterNullish<T>(): OperatorFunction<T, NonNullable<T>> {
  return (source$: Observable<T>) => source$.pipe(filter((value: T): value is NonNullable<T> => value !== null && value !== undefined));
}
