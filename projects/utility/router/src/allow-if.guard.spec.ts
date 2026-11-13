import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GuardResult, Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { allowIf, redirectIf } from './allow-if.guard';
import { runGuard, urlOf } from './testing';


describe('allowIf', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('should allow the route when the condition is true', async () => {
    // GIVEN
    const guard = allowIf(() => of(true), '/login');

    // WHEN
    const result: GuardResult = await runGuard(() => guard({} as never, {} as never));

    // THEN
    expect(result).toBeTrue();
  });

  it('should refuse without a redirection', async () => {
    // GIVEN
    const guard = allowIf(() => false);

    // WHEN
    const result: GuardResult = await runGuard(() => guard({} as never, {} as never));

    // THEN
    expect(result).toBeFalse();
  });

  it('should redirect, with a condition using inject()', async () => {
    // GIVEN
    const guard = allowIf(() => Promise.resolve(inject(Router).url === '/admin'), '/login');

    // WHEN
    const result: GuardResult = await runGuard(() => guard({} as never, {} as never));

    // THEN
    expect(urlOf(result)).toBe('/login');
  });
});

describe('redirectIf', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('should redirect when the condition is true, and allow otherwise', async () => {
    // GIVEN
    const loggedIn = redirectIf(() => true, '/home');
    const loggedOut = redirectIf(() => false, '/home');

    // WHEN
    const results: GuardResult[] = [
      await runGuard(() => loggedIn({} as never, {} as never)),
      await runGuard(() => loggedOut({} as never, {} as never))
    ];

    // THEN
    expect(results.map(urlOf)).toEqual(['/home', true]);
  });
});
