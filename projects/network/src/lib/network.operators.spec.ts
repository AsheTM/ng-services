import { fakeAsync, tick } from '@angular/core/testing';
import { Observable, defer, of, throwError } from 'rxjs';

import { retryUntilOnline } from './network.operators';

function createFlakySource(failures: number): { source$: Observable<string>, calls: () => number } {
  let calls: number = 0;
  const source$: Observable<string> = defer(() => ++calls <= failures ? throwError('error') : of('success'));

  return { source$, calls: () => calls };
}

function goOnline(): void {
  window.dispatchEvent(new Event('online'));
}

function goOffline(): void {
  window.dispatchEvent(new Event('offline'));
}

describe('retryUntilOnline', () => {
  it('should not touch a source that succeeds', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const { source$, calls } = createFlakySource(0);
    const values: string[] = [];

    // WHEN
    source$.pipe(retryUntilOnline()).subscribe((value: string) => values.push(value));

    // THEN
    expect(values).toEqual(['success']);
    expect(calls()).toBe(1);
  });

  it('should pass the error through when the device is online', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const { source$, calls } = createFlakySource(1);
    let error: unknown;

    // WHEN
    source$.pipe(retryUntilOnline()).subscribe({ error: (e: unknown) => error = e });

    // THEN
    expect(error).toBe('error');
    expect(calls()).toBe(1);
  });

  it('should wait for the device to be online, then retry after durationStep', fakeAsync(() => {
    // GIVEN
    const onLine = spyOnProperty(navigator, 'onLine').and.returnValue(false);
    const { source$, calls } = createFlakySource(1);
    const values: string[] = [];
    source$.pipe(retryUntilOnline(500)).subscribe((value: string) => values.push(value));

    // WHEN
    tick(10000);

    // THEN
    expect(calls()).toBe(1);

    // WHEN
    onLine.and.returnValue(true);
    goOnline();
    tick(499);

    // THEN
    expect(calls()).toBe(1);

    // WHEN
    tick(1);

    // THEN
    expect(calls()).toBe(2);
    expect(values).toEqual(['success']);
  }));

  it('should increase the delay with each attempt when timeIncreasing is true', fakeAsync(() => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(false);
    const { source$, calls } = createFlakySource(2);
    const values: string[] = [];
    source$.pipe(retryUntilOnline(100, true)).subscribe((value: string) => values.push(value));

    // WHEN
    goOnline();
    tick(100);

    // THEN
    expect(calls()).toBe(2);

    // WHEN
    goOffline();
    goOnline();
    tick(199);

    // THEN
    expect(calls()).toBe(2);

    // WHEN
    tick(1);

    // THEN
    expect(calls()).toBe(3);
    expect(values).toEqual(['success']);
  }));
});
