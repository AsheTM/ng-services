import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GuardResult, MaybeAsync, Router, provideRouter } from '@angular/router';

import { allGuards, anyGuard } from './combine.guard';
import { runGuard, urlOf } from './testing';


describe('allGuards', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('should run the guards in order and allow when all allow', async () => {
    // GIVEN
    const calls: string[] = [];
    const guard = allGuards(
      () => { calls.push('first'); return Promise.resolve(true); },
      () => { calls.push('second'); return true; }
    );

    // WHEN
    const result: GuardResult = await runGuard(() => guard());

    // THEN
    expect(result).toBeTrue();
    expect(calls).toEqual(['first', 'second']);
  });

  it('should stop at the first refusal and return it', async () => {
    // GIVEN
    const calls: string[] = [];
    const guard = allGuards(
      () => { calls.push('first'); return inject(Router).parseUrl('/login'); },
      () => { calls.push('second'); return true; }
    );

    // WHEN
    const result: GuardResult = await runGuard(() => guard());

    // THEN
    expect(urlOf(result)).toBe('/login');
    expect(calls).toEqual(['first']);
  });

  it('should give the injection context back after an async guard', async () => {
    // GIVEN
    const guard = allGuards(
      () => Promise.resolve(true),
      (): MaybeAsync<GuardResult> => inject(Router).parseUrl('/next')
    );

    // WHEN
    const result: GuardResult = await runGuard(() => guard());

    // THEN
    expect(urlOf(result)).toBe('/next');
  });
});

describe('anyGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('should allow as soon as one guard allows', async () => {
    // GIVEN
    const calls: string[] = [];
    const guard = anyGuard(
      () => { calls.push('first'); return false; },
      () => { calls.push('second'); return true; },
      () => { calls.push('third'); return true; }
    );

    // WHEN
    const result: GuardResult = await runGuard(() => guard());

    // THEN
    expect(result).toBeTrue();
    expect(calls).toEqual(['first', 'second']);
  });

  it('should return the result of the first guard when none allows', async () => {
    // GIVEN
    const guard = anyGuard(
      () => inject(Router).parseUrl('/login'),
      () => false
    );

    // WHEN
    const result: GuardResult = await runGuard(() => guard());

    // THEN
    expect(urlOf(result)).toBe('/login');
  });

  it('should refuse without guards', async () => {
    // GIVEN
    const guard = anyGuard();

    // WHEN
    const result: GuardResult = await runGuard(() => guard());

    // THEN
    expect(result).toBeFalse();
  });
});
