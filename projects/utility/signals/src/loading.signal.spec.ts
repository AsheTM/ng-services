import { Signal, WritableSignal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, Subject, of, throwError } from 'rxjs';

import { LoadingState } from '@ashetm/ng-utility/operators';
import { loadingSignal } from './loading.signal';


describe('loadingSignal', () => {
  it('should be loading, then give the data', () => {
    // GIVEN
    const request$: Subject<number> = new Subject<number>();
    const state: Signal<LoadingState<number>> = TestBed.runInInjectionContext(() => loadingSignal(request$));
    const before: LoadingState<number> = state();

    // WHEN
    request$.next(1);

    // THEN
    expect(before).toEqual({ loading: true });
    expect(state()).toEqual({ loading: false, data: 1 });
  });

  it('should give the error', () => {
    // GIVEN
    // WHEN
    const state: Signal<LoadingState<number>> = TestBed.runInInjectionContext(() => loadingSignal(throwError(() => 'failed')));

    // THEN
    expect(state()).toEqual({ loading: false, error: 'failed' });
  });

  it('should run the request again when the signals it reads change', () => {
    // GIVEN
    const id: WritableSignal<number> = signal(1);
    const requests: Subject<string>[] = [];
    const request = (userId: number): Observable<string> => {
      const request$: Subject<string> = new Subject<string>();

      requests[userId] = request$;

      return request$;
    };
    const state: Signal<LoadingState<string>> = TestBed.runInInjectionContext(() => loadingSignal(() => request(id()), { keepData: true }));
    TestBed.tick();
    requests[1].next('User 1');

    // WHEN
    id.set(2);
    TestBed.tick();
    const reloading: LoadingState<string> = state();
    requests[2].next('User 2');

    // THEN
    expect(reloading).toEqual({ loading: true, data: 'User 1' });
    expect(state()).toEqual({ loading: false, data: 'User 2' });
  });

  it('should not keep the data by default', () => {
    // GIVEN
    const id: WritableSignal<number> = signal(1);
    const state: Signal<LoadingState<number>> = TestBed.runInInjectionContext(() => loadingSignal(() => id() === 1 ? of(1) : new Subject<number>()));
    TestBed.tick();

    // WHEN
    id.set(2);
    TestBed.tick();

    // THEN
    expect(state()).toEqual({ loading: true });
  });
});
