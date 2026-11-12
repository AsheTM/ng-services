import { ArrayUnique } from './array-unique.pipe';


describe('ArrayUnique', () => {
  const pipe = new ArrayUnique();

  it('should remove duplicates and keep the first occurrence', () => {
    // GIVEN
    const list: number[] = [3, 1, 3, 2, 1];

    // WHEN
    const result: number[] = pipe.transform(list);

    // THEN
    expect(result).toEqual([3, 1, 2]);
    expect(list).toEqual([3, 1, 3, 2, 1]);
  });

  it('should remove duplicates by key', () => {
    // GIVEN
    const list: Record<'id' | 'name', string | number>[] = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }];

    // WHEN
    const result: Record<'id' | 'name', string | number>[] = pipe.transform(list, 'id');

    // THEN
    expect(result).toEqual([{ id: 1, name: 'a' }, { id: 2, name: 'b' }]);
  });

  it('should return an empty list for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: number[][] = [pipe.transform<number>(null), pipe.transform<number>(undefined)];

    // THEN
    expect(results).toEqual([[], []]);
  });
});
