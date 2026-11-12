import { from } from 'rxjs';

import { filterNullish } from './filter-nullish.operator';


describe('filterNullish', () => {
  it('should drop null and undefined, and keep other falsy values', () => {
    // GIVEN
    const source: (string | number | boolean | null | undefined)[] = ['a', null, 0, undefined, false, ''];
    const values: (string | number | boolean)[] = [];

    // WHEN
    from(source)
      .pipe(filterNullish())
      .subscribe((value: string | number | boolean) => values.push(value));

    // THEN
    expect(values).toEqual(['a', 0, false, '']);
  });
});
