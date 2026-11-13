import { of } from 'rxjs';

import { sumFromArray } from './sum-from-array.operator';


describe('sumFromArray', () => {
  it('should sum the numbers', () => {
    // GIVEN
    const values: number[] = [];

    // WHEN
    of([1, 2, 3]).pipe(sumFromArray<number>()).subscribe((value: number) => values.push(value));

    // THEN
    expect(values).toEqual([6]);
  });

  it('should sum the values of a key', () => {
    // GIVEN
    const values: number[] = [];

    // WHEN
    of([{ price: 10 }, { price: 5 }]).pipe(sumFromArray<Record<'price', number>>('price')).subscribe((value: number) => values.push(value));

    // THEN
    expect(values).toEqual([15]);
  });
});
