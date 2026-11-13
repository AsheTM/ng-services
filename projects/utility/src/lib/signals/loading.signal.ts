import { Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, isObservable, switchMap } from 'rxjs';

import { LoadingState, withLoading } from '../operators/with-loading.operator';
import { SignalOptions, resolveInjector } from './signal-options';


/**
 * `withLoading` as a signal: `{ loading: true }`, then `{ loading: false, data }` or `{ loading: false, error }`.
 *
 * With a function, the request runs again when the signals it reads change (the previous one is cancelled),
 * and `keepData` keeps the last data during the new request.
 */
export function loadingSignal<T>(
  source: Observable<T> | (() => Observable<T>),
  options?: SignalOptions & { keepData?: boolean }
): Signal<LoadingState<T>> {
  const injector = resolveInjector(loadingSignal, options);
  const loading = withLoading<T>({ keepData: options?.keepData });
  const states$: Observable<LoadingState<T>> = isObservable(source)
    ? source.pipe(loading)
    : toObservable(computed(source), { injector }).pipe(switchMap((request$: Observable<T>) => request$.pipe(loading)));

  return toSignal(states$, { initialValue: { loading: true }, injector });
}
