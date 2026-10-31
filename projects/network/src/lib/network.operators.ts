import { MonoTypeOperatorFunction, Observable, throwError } from "rxjs";
import { concatMap, delay, first, retryWhen } from "rxjs/operators";

import { isOnline } from "./network.platform";
import { fromNetworkEvents } from "./network.rxjs";

/**
 * @experimental feature
 */
export function retryUntilOnline<T>(durationStep: number = 1000, timeIncreasing: boolean = false): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>): Observable<T> => source$.pipe(
    retryWhen((errors$: Observable<unknown>) => errors$.pipe(
      concatMap((error: unknown, index: number) => isOnline()
        ? throwError(error)
        : fromNetworkEvents().pipe(
          first((isOnline: boolean) => isOnline),
          delay((timeIncreasing ? index + 1 : 1) * durationStep)
        ))
    ))
  );
}
