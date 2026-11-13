import { GuardResult, MaybeAsync, Router, UrlTree } from '@angular/router';
import { Observable, from, isObservable, of, take } from 'rxjs';


/**
 * A condition of a guard: a boolean, or an Observable / Promise of it
 */
export type GuardCondition = () => MaybeAsync<boolean>;

export function toObservable<T>(value: MaybeAsync<T>): Observable<T> {
  if (isObservable(value)) {
    return value.pipe(take(1));
  }

  return value instanceof Promise ? from(value) : of(value);
}

export function toRedirect(router: Router, redirectTo?: string | UrlTree): GuardResult {
  if (redirectTo === undefined) {
    return false;
  }

  return typeof redirectTo === 'string' ? router.parseUrl(redirectTo) : redirectTo;
}
