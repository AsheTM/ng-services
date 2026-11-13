import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, GuardResult, Router, convertToParamMap, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { paramGuard, queryParamGuard } from './param.guard';
import { runGuard, urlOf } from './testing';


@Component({ template: '' })
class PageComponent { }

describe('paramGuard', () => {
  function routeWith(params: Record<string, string>, queryParams: Record<string, string> = {}): ActivatedRouteSnapshot {
    return { paramMap: convertToParamMap(params), queryParamMap: convertToParamMap(queryParams) } as ActivatedRouteSnapshot;
  }

  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('should allow a present parameter by default, and refuse a missing one', async () => {
    // GIVEN
    const guard = paramGuard('id');

    // WHEN
    const results: GuardResult[] = [
      await runGuard(() => guard(routeWith({ id: '1' }), {} as never)),
      await runGuard(() => guard(routeWith({}), {} as never))
    ];

    // THEN
    expect(results).toEqual([true, false]);
  });

  it('should redirect an invalid parameter', async () => {
    // GIVEN
    const guard = paramGuard('id', (id: string) => /^\d+$/.test(id), '/not-found');

    // WHEN
    const result: GuardResult = await runGuard(() => guard(routeWith({ id: 'abc' }), {} as never));

    // THEN
    expect(urlOf(result)).toBe('/not-found');
  });

  it('should check a query parameter', async () => {
    // GIVEN
    const guard = queryParamGuard('token');

    // WHEN
    const results: GuardResult[] = [
      await runGuard(() => guard(routeWith({}, { token: 'abc' }), {} as never)),
      await runGuard(() => guard(routeWith({}, { token: '' }), {} as never))
    ];

    // THEN
    expect(results).toEqual([true, false]);
  });
});

describe('paramGuard in a router', () => {
  it('should redirect the navigation', async () => {
    // GIVEN
    TestBed.configureTestingModule({
      providers: [provideRouter([
        { path: 'user/:id', component: PageComponent, canActivate: [paramGuard('id', (id: string) => /^\d+$/.test(id), '/not-found')] },
        { path: 'not-found', component: PageComponent }
      ])]
    });
    const harness: RouterTestingHarness = await RouterTestingHarness.create();

    // WHEN
    await harness.navigateByUrl('/user/42');
    const valid: string = TestBed.inject(Router).url;
    await harness.navigateByUrl('/user/abc');

    // THEN
    expect(valid).toBe('/user/42');
    expect(TestBed.inject(Router).url).toBe('/not-found');
  });
});
