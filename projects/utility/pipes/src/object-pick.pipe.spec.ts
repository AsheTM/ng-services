import { ObjectPick } from './object-pick.pipe';


describe('ObjectPick', () => {
  const pipe = new ObjectPick();

  it('should keep only the given keys', () => {
    // GIVEN
    const value: Record<'a' | 'b' | 'c', number> = { a: 1, b: 2, c: 3 };

    // WHEN
    const result: Pick<Record<'a' | 'b' | 'c', number>, 'a' | 'c'> = pipe.transform(value, ['a', 'c']);

    // THEN
    expect(result).toEqual({ a: 1, c: 3 });
    expect(value).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should skip keys missing from the object', () => {
    // GIVEN
    const value: Partial<Record<'a' | 'b', number>> = { a: 1 };

    // WHEN
    const result: Partial<Record<'a' | 'b', number>> = pipe.transform(value, ['a', 'b']);

    // THEN
    expect(result).toEqual({ a: 1 });
  });

  it('should return an empty object for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: object[] = [pipe.transform<Record<'a', number>, 'a'>(null, ['a']), pipe.transform<Record<'a', number>, 'a'>(undefined, ['a'])];

    // THEN
    expect(results).toEqual([{}, {}]);
  });
});
