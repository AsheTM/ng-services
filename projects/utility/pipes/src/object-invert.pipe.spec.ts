import { ObjectInvert } from './object-invert.pipe';


describe('ObjectInvert', () => {
  const pipe = new ObjectInvert();

  it('should swap keys and values', () => {
    // GIVEN
    const value: Record<string, string | number> = { fr: 'France', es: 'Spain', one: 1 };

    // WHEN
    const result: Record<string, string> = pipe.transform(value);

    // THEN
    expect(result).toEqual({ France: 'fr', Spain: 'es', 1: 'one' });
  });

  it('should keep the last key for duplicate values', () => {
    // GIVEN
    const value: Record<string, string> = { a: 'x', b: 'x' };

    // WHEN
    const result: Record<string, string> = pipe.transform(value);

    // THEN
    expect(result).toEqual({ x: 'b' });
  });

  it('should return an empty object for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: Record<string, string>[] = [pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual([{}, {}]);
  });
});
