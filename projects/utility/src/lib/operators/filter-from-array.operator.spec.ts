import { Observable, of } from 'rxjs';

import { filterFromArray } from './filter-from-array.operator';


describe('filterFromArray', () => {
  it('should returns whole array', () => {
    const list: number[] = [1, 2, 3, 4, 5];
    const obs$: Observable<number[]> = of(list);
    const fn: (item: number) => boolean = (item: number) => item >= 1;

    obs$.pipe(filterFromArray(fn))
      .subscribe((value: number[]) => {
        expect(value.length).toBeLessThanOrEqual(list.length);
      });
  });

  it('should returns partial array', () => {
    const list: number[] = [1, 2, 3, 4, 5];
    const obs$: Observable<number[]> = of(list);
    const fn: (item: number) => boolean = (item: number) => item > 3;

    obs$.pipe(filterFromArray(fn))
      .subscribe((value: number[]) => {
        expect(value.length).toBeLessThan(list.length);
      });
  });
});
