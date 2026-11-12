import { ObjectIsEmpty } from './object-is-empty.pipe';


describe('ObjectIsEmpty', () => {
  const pipe = new ObjectIsEmpty();

  it('should be true for an empty object, null or undefined', () => {
    // GIVEN
    // WHEN
    const results: boolean[] = [pipe.transform({}), pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual([true, true, true]);
  });

  it('should be false for an object with keys', () => {
    // GIVEN
    const value: Record<string, unknown> = { a: undefined };

    // WHEN
    const result: boolean = pipe.transform(value);

    // THEN
    expect(result).toBeFalse();
  });
});
