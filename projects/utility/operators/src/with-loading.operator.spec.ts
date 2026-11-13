import { Subject, of, throwError } from 'rxjs';

import { LoadingState, withLoading } from './with-loading.operator';


describe('withLoading', () => {
  it('should emit loading, then the data', () => {
    // GIVEN
    const states: LoadingState<number>[] = [];
    let completed: boolean = false;

    // WHEN
    of(1).pipe(withLoading<number>()).subscribe({ next: (state: LoadingState<number>) => states.push(state), complete: () => completed = true });

    // THEN
    expect(states).toEqual([{ loading: true }, { loading: false, data: 1 }]);
    expect(completed).toBeTrue();
  });

  it('should turn an error into a state and complete', () => {
    // GIVEN
    const states: LoadingState<number>[] = [];
    let errored: boolean = false;
    let completed: boolean = false;

    // WHEN
    throwError('failed').pipe(withLoading<number>()).subscribe({
      next: (state: LoadingState<number>) => states.push(state),
      error: () => errored = true,
      complete: () => completed = true
    });

    // THEN
    expect(states).toEqual([{ loading: true }, { loading: false, error: 'failed' }]);
    expect(errored).toBeFalse();
    expect(completed).toBeTrue();
  });

  it('should not keep data between requests by default', () => {
    // GIVEN
    const loading = withLoading<number>();
    const states: LoadingState<number>[] = [];
    of(1).pipe(loading).subscribe();

    // WHEN
    new Subject<number>().pipe(loading).subscribe((state: LoadingState<number>) => states.push(state));

    // THEN
    expect(states).toEqual([{ loading: true }]);
  });

  it('should keep the last data during a reload with keepData', () => {
    // GIVEN
    const loading = withLoading<number>({ keepData: true });
    const states: LoadingState<number>[] = [];
    of(1).pipe(loading).subscribe();

    // WHEN
    of(2).pipe(loading).subscribe((state: LoadingState<number>) => states.push(state));
    throwError('failed').pipe(loading).subscribe((state: LoadingState<number>) => states.push(state));

    // THEN
    expect(states).toEqual([
      { loading: true, data: 1 },
      { loading: false, data: 2 },
      { loading: true, data: 2 },
      { loading: false, data: 2, error: 'failed' }
    ]);
  });
});
