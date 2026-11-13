import { Observable, of } from 'rxjs';

import { mapFromArray } from './map-from-array.operator';


describe('mapFromArray', () => {
  it('should works properly', () => {
    const list: number[] = [1, 2, 3, 4, 5];
    const obs$: Observable<number[]> = of(list);
    const fn: (item: number) => string = (item: number) => `${item}`;

    obs$.pipe(mapFromArray(fn))
      .subscribe((value: string[]) => {
        expect(value.length).toBe(list.length);
      });
  });
});
