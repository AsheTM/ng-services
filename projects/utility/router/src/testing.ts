import { TestBed } from '@angular/core/testing';
import { GuardResult, MaybeAsync, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { toObservable } from './guard-result';


/**
 * Runs a guard in an injection context and gives its result (spec helper)
 */
export function runGuard(guard: () => MaybeAsync<GuardResult>): Promise<GuardResult> {
  return firstValueFrom(toObservable(TestBed.runInInjectionContext(guard)));
}

export function urlOf(result: GuardResult): string | GuardResult {
  return result instanceof UrlTree ? result.toString() : result;
}
