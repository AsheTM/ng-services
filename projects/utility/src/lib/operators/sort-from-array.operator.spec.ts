import { of } from 'rxjs';

import { sortFromArray } from './sort-from-array.operator';


describe('sortFromArray', () => {
  it('should sort ascending by default, without modifying the emitted list', () => {
    // GIVEN
    const list: number[] = [3, 1, 2];
    const values: number[][] = [];

    // WHEN
    of(list).pipe(sortFromArray<number>()).subscribe((value: number[]) => values.push(value));

    // THEN
    expect(values).toEqual([[1, 2, 3]]);
    expect(list).toEqual([3, 1, 2]);
  });

  it('should sort descending by key', () => {
    // GIVEN
    const values: Record<'age', number>[][] = [];

    // WHEN
    of([{ age: 20 }, { age: 40 }, { age: 30 }]).pipe(sortFromArray<Record<'age', number>>('desc', 'age')).subscribe((value: Record<'age', number>[]) => values.push(value));

    // THEN
    expect(values).toEqual([[{ age: 40 }, { age: 30 }, { age: 20 }]]);
  });
});
