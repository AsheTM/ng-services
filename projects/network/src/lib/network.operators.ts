import { MonoTypeOperatorFunction, Observable, timer } from "rxjs";
import { delayWhen, retryWhen } from "rxjs/operators";

import { fromNetworkEvents } from "./network.rxjs";

/**
 * @experimental feature
 */
export function retryUntilOnline<T>(durationStep: number = 1000, timeIncreasing: boolean = false): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>): Observable<T> => source$.pipe(
    retryWhen((_: Observable<unknown>) => fromNetworkEvents().pipe(
      delayWhen((isOnline: boolean, index: number) => isOnline ? source$ : timer((timeIncreasing ? index : 1) * durationStep))
    ))
  );
}
