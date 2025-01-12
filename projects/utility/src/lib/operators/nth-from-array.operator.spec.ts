import { Observable, of } from 'rxjs';

import { nthFromArray } from './nth-from-array.operator';


describe('nthFromArray', () => {
  it('should returns whole array', () => {
    const list: number[] = [1, 2, 3, 4, 5];
    const obs$: Observable<number[]> = of(list);

    obs$.pipe(nthFromArray(2))
      .subscribe((value: number | undefined) => {
        expect(value).toBeTruthy();
      });
  });

  it('should returns partial array', () => {
    const list: number[] = [];
    const obs$: Observable<number[]> = of(list);

    obs$.pipe(nthFromArray(2))
      .subscribe((value: number | undefined) => {
        expect(value).toBeFalsy();
      });
  });
});
