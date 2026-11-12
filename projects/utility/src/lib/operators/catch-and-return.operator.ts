import { Observable, OperatorFunction, of } from "rxjs";
import { catchError } from "rxjs/operators";

/**
 * On error, emits `value` and completes (instead of erroring)
 */
export function catchAndReturn<T, R>(value: R): OperatorFunction<T, T | R> {
  return (source$: Observable<T>) => source$.pipe(catchError(() => of(value)));
}
