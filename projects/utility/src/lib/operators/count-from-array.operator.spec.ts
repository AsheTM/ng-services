import { of } from 'rxjs';

import { countFromArray } from './count-from-array.operator';


describe('countFromArray', () => {
  it('should count the items matching the function', () => {
    // GIVEN
    const values: number[] = [];

    // WHEN
    of([1, 5, 10, 15], null).pipe(countFromArray<number>((item: number) => item > 4)).subscribe((value: number) => values.push(value));

    // THEN
    expect(values).toEqual([3, 0]);
  });
});
