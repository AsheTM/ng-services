import { ObjectSize } from './object-size.pipe';


describe('ObjectSize', () => {
  const pipe = new ObjectSize();

  it('should count the keys', () => {
    // GIVEN
    const value: Record<string, number> = { a: 1, b: 2 };

    // WHEN
    const result: number = pipe.transform(value);

    // THEN
    expect(result).toBe(2);
  });

  it('should return 0 for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: number[] = [pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual([0, 0]);
  });
});
