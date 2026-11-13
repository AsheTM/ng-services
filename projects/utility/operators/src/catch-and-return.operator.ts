import { Observable, OperatorFunction, of, catchError } from "rxjs";

/**
 * On error, emits `value` and completes (instead of erroring)
 */
export function catchAndReturn<T, R>(value: R): OperatorFunction<T, T | R> {
  return (source$: Observable<T>) => source$.pipe(catchError(() => of(value)));
}
