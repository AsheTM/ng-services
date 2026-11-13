import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, ParamMap, Router, UrlTree } from '@angular/router';

import { toRedirect } from './guard-result';


/**
 * Allows the route when its parameter `name` is valid (by default: present and not empty);
 * otherwise redirects to `redirectTo`, or refuses without it
 */
export function paramGuard(name: string, isValid: (value: string) => boolean = isNotEmpty, redirectTo?: string | UrlTree): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => check(route.paramMap, name, isValid, redirectTo);
}

/**
 * Same as `paramGuard`, for a query parameter (`?name=value`)
 */
export function queryParamGuard(name: string, isValid: (value: string) => boolean = isNotEmpty, redirectTo?: string | UrlTree): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => check(route.queryParamMap, name, isValid, redirectTo);
}

function isNotEmpty(value: string): boolean {
  return value !== '';
}

function check(params: ParamMap, name: string, isValid: (value: string) => boolean, redirectTo?: string | UrlTree): GuardResult {
  const value: string | null = params.get(name);

  return value !== null && isValid(value) ? true : toRedirect(inject(Router), redirectTo);
}
