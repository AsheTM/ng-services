import { MonoTypeOperatorFunction, Observable, delay, first, retry, throwError } from "rxjs";

import { isOnline } from "./network.platform";
import { fromNetworkEvents } from "./network.rxjs";

/**
 * @experimental feature
 */
export function retryUntilOnline<T>(durationStep: number = 1000, timeIncreasing: boolean = false): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>): Observable<T> => source$.pipe(
    retry({
      delay: (error: unknown, retryCount: number) => isOnline()
        ? throwError(() => error)
        : fromNetworkEvents().pipe(
          first((online: boolean) => online),
          delay((timeIncreasing ? retryCount : 1) * durationStep)
        )
    })
  );
}
