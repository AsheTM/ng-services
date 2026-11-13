import { Signal, WritableSignal, signal } from '@angular/core';

import { previousSignal } from './previous.signal';


describe('previousSignal', () => {
  it('should be undefined at first', () => {
    // GIVEN
    const source: WritableSignal<number> = signal(1);

    // WHEN
    const previous: Signal<number | undefined> = previousSignal(source);

    // THEN
    expect(previous()).toBeUndefined();
  });

  it('should give the value before the last change', () => {
    // GIVEN
    const source: WritableSignal<number> = signal(1);
    const previous: Signal<number | undefined> = previousSignal(source);
    previous();

    // WHEN
    source.set(2);
    const afterFirst: number | undefined = previous();
    source.set(3);

    // THEN
    expect(afterFirst).toBe(1);
    expect(previous()).toBe(2);
  });
});
