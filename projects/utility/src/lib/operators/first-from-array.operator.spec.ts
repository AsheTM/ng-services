import { Observable, of } from 'rxjs';

import { firstFromArray } from './first-from-array.operator';


describe('firstFromArray', () => {
  it('should returns whole array', () => {
    const list: number[] = [1, 2, 3, 4, 5];
    const obs$: Observable<number[]> = of(list);

    obs$.pipe(firstFromArray())
      .subscribe((value: number | undefined) => {
        expect(value).toBeTruthy();
      });
  });

  it('should returns partial array', () => {
    const list: number[] = [];
    const obs$: Observable<number[]> = of(list);

    obs$.pipe(firstFromArray())
      .subscribe((value: number | undefined) => {
        expect(value).toBeFalsy();
      });
  });
});
