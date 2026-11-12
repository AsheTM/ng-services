import { of } from 'rxjs';

import { pick } from './pick.operator';


describe('pick', () => {
  it('should read the key of each value', () => {
    // GIVEN
    const values: (string | undefined)[] = [];

    // WHEN
    of<Record<'name', string> | null>({ name: 'John' }, null, { name: 'Jane' })
      .pipe(pick<Record<'name', string>, 'name'>('name'))
      .subscribe((value: string | undefined) => values.push(value));

    // THEN
    expect(values).toEqual(['John', undefined, 'Jane']);
  });
});
