import { of } from 'rxjs';

import { isEmptyArray } from './is-empty-array.operator';


describe('isEmptyArray', () => {
  it('should tell whether each list is empty', () => {
    // GIVEN
    const values: boolean[] = [];

    // WHEN
    of([], [1], null, undefined).pipe(isEmptyArray<number>()).subscribe((value: boolean) => values.push(value));

    // THEN
    expect(values).toEqual([true, false, true, true]);
  });
});
