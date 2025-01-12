import { Observable, of } from 'rxjs';

import { lastFromArray } from './last-from-array.operator';


describe('lastFromArray', () => {
  it('should returns whole array', () => {
    const list: number[] = [1, 2, 3, 4, 5];
    const obs$: Observable<number[]> = of(list);

    obs$.pipe(lastFromArray())
      .subscribe((value: number | undefined) => {
        expect(value).toBeTruthy();
      });
  });

  it('should returns partial array', () => {
    const list: number[] = [];
    const obs$: Observable<number[]> = of(list);

    obs$.pipe(lastFromArray())
      .subscribe((value: number | undefined) => {
        expect(value).toBeFalsy();
      });
  });
});
