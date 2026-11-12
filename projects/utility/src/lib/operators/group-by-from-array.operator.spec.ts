import { of } from 'rxjs';

import { groupByFromArray } from './group-by-from-array.operator';


describe('groupByFromArray', () => {
  it('should group items by key', () => {
    // GIVEN
    const values: Record<string, Record<'type' | 'name', string>[]>[] = [];

    // WHEN
    of([{ type: 'a', name: 'x' }, { type: 'b', name: 'y' }, { type: 'a', name: 'z' }])
      .pipe(groupByFromArray<Record<'type' | 'name', string>>('type'))
      .subscribe((value: Record<string, Record<'type' | 'name', string>[]>) => values.push(value));

    // THEN
    expect(values).toEqual([{ a: [{ type: 'a', name: 'x' }, { type: 'a', name: 'z' }], b: [{ type: 'b', name: 'y' }] }]);
  });
});
