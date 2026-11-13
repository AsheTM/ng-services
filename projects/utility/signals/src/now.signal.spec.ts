import { EnvironmentInjector, Signal, createEnvironmentInjector } from '@angular/core';
import { TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { nowSignal } from './now.signal';


describe('nowSignal', () => {
  it('should start with the current time', () => {
    // GIVEN
    const before: number = Date.now();

    // WHEN
    const now: Signal<number> = TestBed.runInInjectionContext(() => nowSignal());

    // THEN
    expect(now()).toBeGreaterThanOrEqual(before);
    expect(now()).toBeLessThanOrEqual(Date.now());
  });

  it('should update every given milliseconds', fakeAsync(() => {
    // GIVEN
    const now: Signal<number> = TestBed.runInInjectionContext(() => nowSignal(1000));
    const start: number = now();

    // WHEN
    tick(999);
    const during: number = now();
    tick(1);

    // THEN
    expect(during).toBe(start);
    expect(now()).toBe(start + 1000);
    discardPeriodicTasks();
  }));

  it('should stop when its injector is destroyed', fakeAsync(() => {
    // GIVEN
    const injector: EnvironmentInjector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    const now: Signal<number> = nowSignal(1000, { injector });
    const start: number = now();

    // WHEN
    injector.destroy();
    tick(3000);

    // THEN
    expect(now()).toBe(start);
  }));
});
