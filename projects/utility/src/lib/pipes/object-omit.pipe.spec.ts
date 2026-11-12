import { ObjectOmit } from './object-omit.pipe';


describe('ObjectOmit', () => {
  const pipe = new ObjectOmit();

  it('should drop the given keys', () => {
    // GIVEN
    const value: Record<'a' | 'b' | 'c', number> = { a: 1, b: 2, c: 3 };

    // WHEN
    const result: Omit<Record<'a' | 'b' | 'c', number>, 'b'> = pipe.transform(value, ['b']);

    // THEN
    expect(result).toEqual({ a: 1, c: 3 });
    expect(value).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should return an empty object for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: object[] = [pipe.transform<Record<'a', number>, 'a'>(null, ['a']), pipe.transform<Record<'a', number>, 'a'>(undefined, ['a'])];

    // THEN
    expect(results).toEqual([{}, {}]);
  });
});
