import { EnvironmentInjector, Signal, WritableSignal, createEnvironmentInjector, signal } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { debouncedSignal } from './debounced.signal';


describe('debouncedSignal', () => {
  it('should start with the value of the source', () => {
    // GIVEN
    const source: WritableSignal<string> = signal('a');

    // WHEN
    const debounced: Signal<string> = TestBed.runInInjectionContext(() => debouncedSignal(source, 300));

    // THEN
    expect(debounced()).toBe('a');
  });

  it('should follow the source once it stops changing', fakeAsync(() => {
    // GIVEN
    const source: WritableSignal<string> = signal('a');
    const debounced: Signal<string> = TestBed.runInInjectionContext(() => debouncedSignal(source, 300));
    TestBed.tick();

    // WHEN
    source.set('ab');
    TestBed.tick();
    tick(200);
    source.set('abc');
    TestBed.tick();
    tick(299);
    const during: string = debounced();
    tick(1);

    // THEN
    expect(during).toBe('a');
    expect(debounced()).toBe('abc');
  }));

  it('should stop when its injector is destroyed', fakeAsync(() => {
    // GIVEN
    const injector: EnvironmentInjector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    const source: WritableSignal<string> = signal('a');
    const debounced: Signal<string> = debouncedSignal(source, 300, { injector });
    TestBed.tick();
    source.set('b');
    TestBed.tick();

    // WHEN
    injector.destroy();
    tick(300);

    // THEN
    expect(debounced()).toBe('a');
  }));
});
