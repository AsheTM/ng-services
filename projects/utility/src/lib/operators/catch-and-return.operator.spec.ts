import { of, throwError } from 'rxjs';

import { catchAndReturn } from './catch-and-return.operator';


describe('catchAndReturn', () => {
  it('should emit the fallback value on error, then complete', () => {
    // GIVEN
    const values: (number | null)[] = [];
    let errored: boolean = false;
    let completed: boolean = false;

    // WHEN
    throwError('failed').pipe(catchAndReturn<number, null>(null)).subscribe({
      next: (value: number | null) => values.push(value),
      error: () => errored = true,
      complete: () => completed = true
    });

    // THEN
    expect(values).toEqual([null]);
    expect(errored).toBeFalse();
    expect(completed).toBeTrue();
  });

  it('should let values through when there is no error', () => {
    // GIVEN
    const values: number[] = [];

    // WHEN
    of(1, 2).pipe(catchAndReturn<number, number>(0)).subscribe((value: number) => values.push(value));

    // THEN
    expect(values).toEqual([1, 2]);
  });
});
