import { ArrayGroupBy } from './array-group-by.pipe';


describe('ArrayGroupBy', () => {
  const pipe = new ArrayGroupBy();

  it('should group items by key, keeping their order', () => {
    // GIVEN
    const list: Record<'type' | 'name', string>[] = [
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
      { type: 'fruit', name: 'banana' }
    ];

    // WHEN
    const result: Record<string, Record<'type' | 'name', string>[]> = pipe.transform(list, 'type');

    // THEN
    expect(result).toEqual({
      fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
      vegetable: [{ type: 'vegetable', name: 'carrot' }]
    });
  });

  it('should return an empty object for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: Record<string, Record<'id', number>[]>[] = [pipe.transform<Record<'id', number>>(null, 'id'), pipe.transform<Record<'id', number>>(undefined, 'id')];

    // THEN
    expect(results).toEqual([{}, {}]);
  });
});
