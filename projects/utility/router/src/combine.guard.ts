import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { GuardResult, MaybeAsync } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';

import { toObservable } from './guard-result';


type Guard<A extends unknown[]> = (...args: A) => MaybeAsync<GuardResult>;

/**
 * Runs the guards one after the other, and stops at the first one that doesn't allow the route (its result is returned)
 */
export function allGuards<A extends unknown[]>(...guards: Guard<A>[]): (...args: A) => Observable<GuardResult> {
  return (...args: A) => run(inject(EnvironmentInjector), guards, args, (result: GuardResult) => result !== true);
}

/**
 * Runs the guards one after the other, and allows the route as soon as one allows it.
 * When none does, the result of the first one is returned (e.g. its redirection).
 */
export function anyGuard<A extends unknown[]>(...guards: Guard<A>[]): (...args: A) => Observable<GuardResult> {
  return (...args: A) => {
    let first: GuardResult | undefined;

    if (guards.length === 0) {
      return of(false);
    }

    return run(inject(EnvironmentInjector), guards, args, (result: GuardResult) => {
      first ??= result;

      return result === true;
    }).pipe(map((result: GuardResult) => result === true ? true : first ?? false));
  };
}

function runGuard<A extends unknown[]>(injector: EnvironmentInjector, guard: Guard<A>, args: A): Observable<GuardResult> {
  // The next guards run after an async one: give them back their injection context
  return toObservable(runInInjectionContext(injector, () => guard(...args)));
}

function run<A extends unknown[]>(
  injector: EnvironmentInjector,
  guards: Guard<A>[],
  args: A,
  isFinal: (result: GuardResult) => boolean
): Observable<GuardResult> {
  if (guards.length === 0) {
    return of(true);
  }

  return runGuard(injector, guards[0], args).pipe(
    switchMap((result: GuardResult) => isFinal(result) || guards.length === 1 ? of(result) : run(injector, guards.slice(1), args, isFinal))
  );
}
