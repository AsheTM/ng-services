import { Observable, of } from 'rxjs';

import { pluckFromArray } from './pluck-from-array.operator';


describe('pluckFromArray', () => {
  it('should works properly', () => {
    type Type = { a: boolean; b: number };
    const list: Type[] = [
      {
        a: true,
        b: 1
      },
      {
        a: false,
        b: 10
      }
    ];
    const obs$: Observable<Type[]> = of(list);

    obs$.pipe(pluckFromArray('a'))
      .subscribe((value: boolean[]) => {
        expect(value.length).toBe(list.length);
        expect(value.every((item: boolean) => typeof item === 'boolean')).toBeTrue();
      });
  });
});
