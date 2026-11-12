import { from } from 'rxjs';

import { pick } from './pick.operator';


describe('pick', () => {
  it('should read the key of each value', () => {
    // GIVEN
    const source: (Record<'name', string> | null)[] = [{ name: 'John' }, null, { name: 'Jane' }];
    const values: (string | undefined)[] = [];

    // WHEN
    from(source)
      .pipe(pick<Record<'name', string>, 'name'>('name'))
      .subscribe((value: string | undefined) => values.push(value));

    // THEN
    expect(values).toEqual(['John', undefined, 'Jane']);
  });
});
