import { Observable, of } from 'rxjs';

import { containsItem } from './contains-item.operator';


describe('containsItem', () => {
  it('should returns true', () => {
    const obs$: Observable<number[]> = of([1, 2, 3, 4, 5]);
    const fn: (item: number) => boolean = (item: number) => item === 1;

    obs$.pipe(containsItem(fn))
      .subscribe((value: boolean) => {
        expect(value).toBeTrue();
      });
  });

  it('should returns false', () => {
    const obs$: Observable<number[]> = of([1, 2, 3, 4, 5]);
    const fn: (item: number) => boolean = (item: number) => item === 10;

    obs$.pipe(containsItem(fn))
      .subscribe((value: boolean) => {
        expect(value).toBeFalse();
      });
  });
});
