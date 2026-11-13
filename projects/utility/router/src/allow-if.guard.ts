import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanMatchFn, GuardResult, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { GuardCondition, toObservable, toRedirect } from './guard-result';


/**
 * A guard usable in `canActivate`, `canActivateChild` and `canMatch`
 */
export type RouteGuard = CanActivateFn & CanActivateChildFn & CanMatchFn;

/**
 * Allows the route when `condition` is `true`; otherwise redirects to `redirectTo`, or refuses without it.
 * `condition` runs in an injection context, so it can use `inject()`.
 */
export function allowIf(condition: GuardCondition, redirectTo?: string | UrlTree): RouteGuard {
  return (): Observable<GuardResult> => {
    const router: Router = inject(Router);

    return toObservable(condition()).pipe(
      map((allowed: boolean) => allowed ? true : toRedirect(router, redirectTo))
    );
  };
}

/**
 * Redirects to `redirectTo` when `condition` is `true` (e.g. the login page of a logged-in user); otherwise allows the route
 */
export function redirectIf(condition: GuardCondition, redirectTo: string | UrlTree): RouteGuard {
  return allowIf(() => toObservable(condition()).pipe(map((redirect: boolean) => !redirect)), redirectTo);
}
