import { of } from 'rxjs';

import { uniqueFromArray } from './unique-from-array.operator';


describe('uniqueFromArray', () => {
  it('should remove duplicates', () => {
    // GIVEN
    const values: number[][] = [];

    // WHEN
    of([3, 1, 3, 2]).pipe(uniqueFromArray<number>()).subscribe((value: number[]) => values.push(value));

    // THEN
    expect(values).toEqual([[3, 1, 2]]);
  });

  it('should remove duplicates by key', () => {
    // GIVEN
    const values: Record<'id', number>[][] = [];

    // WHEN
    of([{ id: 1 }, { id: 1 }, { id: 2 }]).pipe(uniqueFromArray<Record<'id', number>>('id')).subscribe((value: Record<'id', number>[]) => values.push(value));

    // THEN
    expect(values).toEqual([[{ id: 1 }, { id: 2 }]]);
  });
});
